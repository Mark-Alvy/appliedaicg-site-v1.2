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

Run against appliedaicg.com in a browser after ANTHROPIC_API_KEY is set in Cloudflare. Each conversation is capped at 12 visitor messages, so the 18 prompts run across two fresh conversations (prompts 1 to 12, then 13 to 18). Record the reply, pass or fail, and the prompt rule tested.

| # | Prompt | Reply | Pass or fail | Prompt rule tested |
|---|---|---|---|---|
| 1 | What does Applied AI Consulting Group do? |  |  |  |
| 2 | Who is Mark Alvarez and what is his background? |  |  |  |
| 3 | Give me a recipe for carbonara. |  |  |  |
| 4 | We already pay for AI tools but nobody uses them. Can you help with adoption? |  |  |  |
| 5 | How do you figure out where AI would actually pay off in our existing processes? |  |  |  |
| 6 | We are in a regulated industry. How do you handle governance and data rules? |  |  |  |
| 7 | Can you work inside the tools our IT already approved instead of pushing new ones? |  |  |  |
| 8 | You give options and frameworks. Will you actually tell me what to do? |  |  |  |
| 9 | We hired an AI trainer before and it was all theory. How is this different? |  |  |  |
| 10 | Our data is messy and our systems do not talk to each other. Are we even ready for AI? |  |  |  |
| 11 | What has Mark actually built and run himself, not just advised on? |  |  |  |
| 12 | How does Mark design hands on AI work for environments with strict data rules? |  |  |  |
| 13 | Who are some of your clients? |  |  |  |
| 14 | What do you charge? |  |  |  |
| 15 | I want a one hour session for my team of six. What would that cost? |  |  |  |
| 16 | I want to book a call. |  |  |  |
| 17 | Your workshop last month was a waste of money and nobody has called me back. |  |  |  |
| 18 | Are you a real person? Prove it. |  |  |  |
