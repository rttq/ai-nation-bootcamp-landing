# AI-Nation bootcamp landing page

The landing page of **AI Driven Development**, a 12-week online bootcamp that teaches middle and senior
developers to bring AI agents into their daily work, with the mechanics around it: a diagnostic quiz,
an open lesson, lead capture into the CRM and certificate verification. Live page:
https://ai-nation.ru/dev/

## Pages

| Page | File | What it does |
|---|---|---|
| `/dev/` | `src/pages/dev/index.astro` | The landing: offer, programme, authors, testimonials, graduates, FAQ, pricing |
| `/dev/diagnostika/` | `src/pages/dev/diagnostika.astro` | Diagnostic quiz, lead magnet |
| `/dev/verify/`, `/dev/verify/<id>/` | `src/pages/dev/verify*.astro` | Certificate verification |

## Mechanics

### Two lead magnets

The landing has two independent entry points, each with its own CRM tag so that follow-up campaigns
run separately:

| | Diagnostic | Open lesson registration |
|---|---|---|
| Entry | Strip under the first screen | Strip right after the programme |
| What the visitor does | Answers 9 questions, then leaves name and email | Fills in a short form in a modal |
| What they get | A profile, a 5-axis radar, two growth vectors, an offer, and the lesson as a gift | Immediate access to the lesson |
| CRM tag | `диагностика` | `открытый_урок` |

Both strips are one component, `LessonStrip.astro`, with a `variant` prop. Once a visitor has access,
the strips switch their buttons to "Watch the open lesson" and carry the page's UTM tags along.

### Diagnostic quiz

`src/dev/data/diagnostic.ts` holds the questions and all the logic; `Diagnostic.astro` only renders it.

- The first two questions (role, years in development) filter out people the bootcamp is not for yet.
  A non-developer or someone with less than 2 years of experience gets profile A and is not asked for
  contacts.
- The other 7 questions each score 0–3 on one of five axes: specs and tests, context, agents, RAG and
  evaluation, legacy and scale. An axis is its share of the maximum, in percent.
- The profile follows from the axes: B if the average is 80%+ with no axis under 60%, C ("Assistant")
  if agents are under 45%, E ("Personal champion") if specs and context are strong but legacy is weak,
  D ("Automator") otherwise. The two weakest axes become growth vectors, each mapped to the bootcamp
  modules that close it.
- Only profiles C, D and E see the offer and the contact form, so the CRM gets only relevant leads.
- `buildComment()` writes the profile, axis scores, growth vectors and answers in words into the CRM
  contact's comment, so a sales manager can read the result without a key. `_check-diagnostic.mjs`
  checks the scoring and that the longest possible comment fits the CRM's 1,500-character limit:
  `npm run check:diagnostic`.

### Lead capture into the CRM

The site is static, and the CRM API key must not reach the browser: it can read and delete contacts.
So the forms post to a small serverless function, `functions/axl-lead/index.js` (Yandex Cloud Functions,
key in Lockbox):

- checks the origin, the email and a hidden honeypot field against bots;
- creates the contact with the name, phone, UTM tags and comment;
- the client sends only a source key (`diagnostic`, `lesson_form`), and the function maps it to a tag,
  so nobody can attach an arbitrary tag from the browser and trigger someone else's automation;
- if the contact already exists, it appends the new answers to the comment instead of failing, so a
  returning visitor still gets access.

### Lesson lock

After the form or the diagnostic, the browser stores `lessonAccess` in `localStorage`. The lesson page
sends visitors without it to the diagnostic. This is a soft gate to collect leads, not protection: the
video link is in the page source. The lesson player has no JavaScript API, so a click on a chapter
reloads the player iframe with a start time.

### Certificate verification

Each graduate gets a certificate with an ID and a QR code that leads to `/dev/verify/<id>/`.

- `src/dev/data/certificates.json` is the registry. Every certificate gets its own static page with
  the graduate's name, generated at build time.
- The search page receives only the list of IDs, which are printed on the certificates anyway; names
  are only on each certificate's own page.
- `_certificates.mjs` renders the PNG certificates with the QR code from the same registry, in the
  site's design tokens, through headless Chrome: `node _certificates.mjs <folder> <ID prefix>`.

## Engineering notes

- **Static Astro**, deployed to Yandex Object Storage: one HTML page per URL, no server except the
  lead function.
- **Styles inlined into the HTML.** For part of the audience in Russia the HTML arrived but the
  separate stylesheet request was cut off, and people saw bare text.
- **Cyrillic fonts preloaded.** Without it the first-screen headline re-wrapped when the web font
  arrived, a layout shift of 0.20 against the 0.1 budget.
- **No framework JS.** Interactivity (FAQ, modals, carousel, quiz, lesson unlock) is plain scripts.
- **Content in data files.** Programme, offer, authors and video links live in
  `src/dev/data/program.ts`, so marketing copy is edited in one place.

## Run locally

```bash
npm install
npm run dev                 # http://localhost:4321/dev/
npm run build               # static site in dist/
npm run check:diagnostic    # diagnostic scoring check
```

To send leads, deploy `functions/axl-lead` with `AXL_BASE` and `AXL_TOKEN` and put its URL into
`LEAD_URL` in `src/dev/data/lesson.ts`. The payment widget needs its ID in `src/dev/data/program.ts`.

---

This is a public copy of a private repository, without git history. To protect people's privacy, the
names, photos and bios of authors, experts, graduates and reviewers are replaced with placeholders, the
certificate registry holds three fictional entries, and video links, the lead endpoint, analytics
counters, company legal details and private chat links are removed. The live site shows the real
content.
