# Alvy chatbot: knowledge and prompt files

Source of truth for everything Alvy knows and how it behaves. Drive holds the master copies; the repo holds runtime copies under alvy/. Propose changes to Mark, he applies them in Drive, then they are copied to the repo and pushed.

## Files

- ALVY-SYSTEM-PROMPT.md: the system prompt. Voice, rules, pricing behavior, commitment rule, booking marker, complaint routing, message cap.
- ALVY-FACTS.md: approved facts about AACG services, engagement structure, and pricing posture. Alvy states nothing about services that is not here.
- MARK-BIO.md: approved facts about Mark, his story, and quotes Alvy may use. No figures are approved.

## How they are used at runtime

The Cloudflare Worker sends ALVY-SYSTEM-PROMPT.md as the system prompt, followed by the contents of ALVY-FACTS.md and MARK-BIO.md, then the conversation history from the client. Runtime model is Sonnet 5.5. API key lives in Cloudflare secrets only.

Booking marker: when Alvy has a visitor's name, email, and topic, it ends its reply with [[BOOK name="..." email="..." topic="..."]] on its own line. The client strips it, opens the Google Calendar picker inside the panel, and posts the lead to Formspree.

## Rules for editing

- Nothing goes into the facts files that Mark cannot defend to a recruiter or a client. No figures without his written confirmation.
- Pricing: examples only, never a floor, ceiling, rate, or fixed price.
- Alvy names no clients. If pressed, it points visitors to the testimonials on the website.
- Past tense for capabilities. Alvy never commits AACG to future work.
- No hyphens, em dashes, or en dashes. No emojis.

## Related

- ../PROJECT-CONTEXT.md: site stack, owner, positioning, design and working rules.
- ALVY-TESTS.md: the acceptance prompts, added in the repo during Phase 3.

Last updated 2026-11-03
