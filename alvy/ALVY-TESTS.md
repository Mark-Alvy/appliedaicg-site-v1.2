# Alvy Tests

Acceptance tests for the Alvy chatbot. Part A covers the Worker and panel controls and runs against a mock of the Claude API, so it needs no key. Part B covers the live prompts and runs against appliedaicg.com in a browser once ANTHROPIC_API_KEY is set in Cloudflare.

Last run of Part A: 2026-11-03, local Worker (wrangler dev) with a mock upstream, headless browser for the panel.

## Part A: Worker and panel controls (mock upstream)

| Test | Expected | Result |
|---|---|---|
| GET to /api/alvy | 405 | Pass |
| POST with no Origin header | 403 | Pass |
| POST from a foreign origin | 403 | Pass |
| POST from a lookalike origin (appliedaicg.com.evil.example) | 403 | Pass |
| POST from https://appliedaicg.com and https://www.appliedaicg.com | 200 streamed reply | Pass |
| Wrong content type | 415 | Pass |
| Malformed JSON | 400 | Pass |
| Last message not from the visitor | 400 | Pass |
| Message over 2000 characters | 400 | Pass |
| 12th visitor message in a conversation | 200 | Pass |
| 13th visitor message in a conversation | 429 conversation_limit, never sent to Claude | Pass |
| 31st request from one IP inside 10 minutes (30 allowed) | 429 with Retry-After | Pass |
| Upstream authentication failure | 502, key not present in the response | Pass |
| Upstream overloaded | 503 busy | Pass |
| Upstream error in the middle of a stream | Partial text delivered, stream ends in error | Pass |
| ANTHROPIC_API_KEY not set | 500 server_config | Pass |
| Request sent to Claude | Model claude-sonnet-5-5, max_tokens 500, prompt caching on the system block, last 10 messages only, no temperature or sampling parameters | Pass |
| System text sent to Claude | Contains the system prompt, ALVY-FACTS.md and MARK-BIO.md; no client names | Pass |
| Streamed reply with a multibyte character | Intact in the panel | Pass |
| Booking marker streamed in pieces | Never visible in the panel | Pass |
| Booking marker complete | Calendar picker opens inside the panel with the site booking URL | Pass |
| Booking marker with a valid email | One lead posted to Formspree with name, email, topic | Pass |
| Booking marker with no email | Picker opens, no lead posted | Pass |
| Conversation limit reply from the server | Approved limit message shown, input and Send disabled | Pass |
| Rate limit reply from the server | Approved rate limit message shown | Pass |
| Busy or error reply from the server | Approved busy message shown | Pass |
| Local notice messages | Never sent back to Claude in the history | Pass |

Not covered by Part A: the real Google Calendar picker rendering inside the panel, and anything Claude says. Both are checked in Part B.

## Part B: Live prompts

Not yet added. The 18 prompts were not included in the message that asked for this file. Add them here, then run each against appliedaicg.com and record the reply, pass or fail, and the prompt rule it tests.

| # | Prompt | Reply | Pass or fail | Prompt rule tested |
|---|---|---|---|---|
