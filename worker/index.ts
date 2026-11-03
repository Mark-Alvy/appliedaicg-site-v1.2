import SYSTEM_PROMPT from '../alvy/ALVY-SYSTEM-PROMPT.md'
import FACTS from '../alvy/ALVY-FACTS.md'
import BIO from '../alvy/MARK-BIO.md'

interface Env {
  /** Cloudflare secret. Never in code or config. */
  ANTHROPIC_API_KEY: string
  /** Local dev only, set in .dev.vars. Comma separated extra origins. */
  DEV_ALLOWED_ORIGINS?: string
  /** Local dev only, set in .dev.vars. Points the Worker at a mock upstream. */
  ANTHROPIC_BASE_URL?: string
}

const MODEL = 'claude-sonnet-5-5'
const ANTHROPIC_VERSION = '2026-10-21'
const MAX_OUTPUT_TOKENS = 500
const HISTORY_LIMIT = 10
const VISITOR_MESSAGE_CAP = 12
const RATE_LIMIT = 30
const RATE_WINDOW_MS = 10 * 60 * 1000
const MAX_MESSAGES_RECEIVED = 40
const MAX_MESSAGE_CHARS = 2000
const MAX_BODY_BYTES = 32 * 1024

const ALLOWED_ORIGINS = ['https://appliedaicg.com', 'https://www.appliedaicg.com']

// Static prefix: system prompt, then the two knowledge files. Cached as one block.
const SYSTEM_TEXT = [SYSTEM_PROMPT, FACTS, BIO].map((part) => part.trim()).join('\n\n')

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function json(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  })
}

function originAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.includes(origin)) return true
  const dev = (env.DEV_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  return dev.includes(origin)
}

/**
 * Sliding window limit per IP: at most RATE_LIMIT requests in any RATE_WINDOW_MS.
 * Backed by the Cache API, so there is no new Cloudflare resource to create.
 * It is per data center and not atomic, which is acceptable for an abuse brake.
 */
async function overRateLimit(ip: string): Promise<boolean> {
  const cache = caches.default
  const key = new Request(`https://rate-limit.internal/alvy/${encodeURIComponent(ip)}`)
  const now = Date.now()
  let stamps: number[] = []
  const hit = await cache.match(key)
  if (hit) {
    try {
      const parsed: unknown = JSON.parse(await hit.text())
      if (Array.isArray(parsed)) {
        stamps = parsed.filter((value): value is number => typeof value === 'number' && value > now - RATE_WINDOW_MS)
      }
    } catch {
      stamps = []
    }
  }
  if (stamps.length >= RATE_LIMIT) return true
  stamps.push(now)
  await cache.put(
    key,
    new Response(JSON.stringify(stamps), {
      headers: { 'cache-control': `max-age=${Math.ceil(RATE_WINDOW_MS / 1000)}` },
    }),
  )
  return false
}

function parseMessages(payload: unknown): ChatMessage[] | null {
  if (typeof payload !== 'object' || payload === null) return null
  const raw = (payload as { messages?: unknown }).messages
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES_RECEIVED) return null
  const messages: ChatMessage[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) return null
    const { role, content } = item as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const text = content.trim()
    if (text.length === 0 || text.length > MAX_MESSAGE_CHARS) return null
    messages.push({ role, content: text })
  }
  if (messages[messages.length - 1].role !== 'user') return null
  return messages
}

/** Appended after the last character of a reply that finished cleanly. The panel treats any reply without it as cut off. */
const END_MARKER = '[[END]]'

/**
 * Turns Anthropic server sent events into a plain text stream of the reply.
 * A reply that ends cleanly is followed by END_MARKER. A reply the platform or the upstream
 * cut short ends without it, and the reason is logged (types and counts only, never content).
 */
function sseToText(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''
  let finished = false
  let stopReason = ''
  const usage = { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 }
  let textChars = 0

  const handleEvent = (raw: string, controller: TransformStreamDefaultController<Uint8Array>) => {
    // Cheap exits first: pings and anything that is not one of the events we use.
    const i = raw.indexOf('data:')
    if (i === -1) return
    const kind = raw.slice(0, i)
    if (kind.includes('ping')) return
    let event: {
      type?: string
      delta?: { type?: string; text?: string; stop_reason?: string }
      message?: { usage?: Record<string, number> }
      usage?: Record<string, number>
      error?: { type?: string }
    }
    try {
      event = JSON.parse(raw.slice(i + 5))
    } catch {
      return
    }
    switch (event.type) {
      case 'message_start': {
        const u = event.message?.usage ?? {}
        usage.input = u.input_tokens ?? 0
        usage.cacheWrite = u.cache_creation_input_tokens ?? 0
        usage.cacheRead = u.cache_read_input_tokens ?? 0
        break
      }
      case 'content_block_delta':
        if (event.delta?.type === 'text_delta' && typeof event.delta.text === 'string') {
          textChars += event.delta.text.length
          controller.enqueue(encoder.encode(event.delta.text))
        }
        break
      case 'message_delta':
        usage.output = event.usage?.output_tokens ?? usage.output
        stopReason = event.delta?.stop_reason ?? stopReason
        break
      case 'message_stop':
        finished = true
        controller.enqueue(encoder.encode(END_MARKER))
        console.log(JSON.stringify({ alvy_usage: usage, stop_reason: stopReason }))
        break
      case 'error':
        // Type only. Lets `wrangler tail` or the dashboard logs show why a reply was cut short.
        console.error(JSON.stringify({ alvy_upstream_error: event.error?.type ?? 'unknown', text_chars: textChars }))
        controller.terminate()
        break
      default:
        break
    }
  }

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true })
      if (buffer.includes('\r')) buffer = buffer.replace(/\r\n/g, '\n')
      let at: number
      while ((at = buffer.indexOf('\n\n')) !== -1) {
        const raw = buffer.slice(0, at)
        buffer = buffer.slice(at + 2)
        handleEvent(raw, controller)
      }
    },
    flush(controller) {
      buffer += decoder.decode()
      if (buffer.trim()) handleEvent(buffer, controller)
      if (!finished) {
        console.error(JSON.stringify({ alvy_stream_incomplete: true, text_chars: textChars, usage }))
      }
    },
  })

  return upstream.pipeThrough(transform)
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname !== '/api/alvy') return json(404, { error: 'not_found' })
    if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' }, { allow: 'POST' })

    if (!originAllowed(request.headers.get('origin'), env)) return json(403, { error: 'forbidden_origin' })

    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
    if (await overRateLimit(ip)) {
      return json(429, { error: 'rate_limited' }, { 'retry-after': String(Math.ceil(RATE_WINDOW_MS / 1000)) })
    }

    if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
      return json(415, { error: 'unsupported_media_type' })
    }
    const declared = Number(request.headers.get('content-length') ?? '0')
    if (declared > MAX_BODY_BYTES) return json(413, { error: 'too_large' })
    const bodyText = await request.text()
    if (bodyText.length > MAX_BODY_BYTES) return json(413, { error: 'too_large' })

    let payload: unknown
    try {
      payload = JSON.parse(bodyText)
    } catch {
      return json(400, { error: 'bad_request' })
    }
    const messages = parseMessages(payload)
    if (!messages) return json(400, { error: 'bad_request' })

    // Conversation cap, counted on what the client sent, before trimming history.
    const visitorMessages = messages.filter((message) => message.role === 'user').length
    if (visitorMessages > VISITOR_MESSAGE_CAP) return json(429, { error: 'conversation_limit' })

    // Keep only the last HISTORY_LIMIT messages, and make sure the first one is the visitor's.
    const history = messages.slice(-HISTORY_LIMIT)
    if (history[0].role === 'assistant') history.shift()

    if (!env.ANTHROPIC_API_KEY) {
      console.error('alvy: ANTHROPIC_API_KEY is not set')
      return json(500, { error: 'server_config' })
    }

    const devMode = Boolean(env.DEV_ALLOWED_ORIGINS)
    const base = devMode && env.ANTHROPIC_BASE_URL ? env.ANTHROPIC_BASE_URL : 'https://api.anthropic.com'

    let upstream: Response
    try {
      upstream = await fetch(`${base}/v1/messages`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          stream: true,
          system: [{ type: 'text', text: SYSTEM_TEXT, cache_control: { type: 'ephemeral' } }],
          messages: history,
        }),
        signal: request.signal,
      })
    } catch {
      console.error('alvy: upstream fetch failed')
      return json(502, { error: 'upstream' })
    }

    if (!upstream.ok || !upstream.body) {
      console.error(`alvy: upstream status ${upstream.status}`)
      const busy = upstream.status === 429 || upstream.status === 503 || upstream.status === 529
      return busy ? json(503, { error: 'busy' }) : json(502, { error: 'upstream' })
    }

    return new Response(sseToText(upstream.body), {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        // Streamed replies must not be compressed or buffered by the edge.
        'cache-control': 'no-store, no-transform',
        'content-encoding': 'identity',
        'x-content-type-options': 'nosniff',
      },
    })
  },
} satisfies ExportedHandler<Env>
