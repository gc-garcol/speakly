# Rules for AI coding agents

These rules are mandatory for any AI agent changing this project. If a user request conflicts with a rule, follow the user and update this file in the same change.

## 1. Project

Speak Up is a mobile-first web app for practising IELTS Speaking (Part 1, 2, 3). It has no build step and no dependencies.

```
index.html   markup + all CSS (in <style>)
index.js     all app logic
data/*.js    one file per topic
collocations.html  collocations page: markup + its CSS (same tokens as index.html)
collocations.js    collocations data (GROUPS) + page logic
readme.md    user-facing docs
rule.md      this file
```

## 2. Hard constraints

- The app must work when you open `index.html` directly (`file://`). Never use ES modules (`import`/`export`, `type="module"`), `fetch()` of local files, or anything else that needs a server.
- `index.js` is a classic script wrapped in an IIFE with `"use strict"`. It loads data files by injecting `<script>` tags in the order of `DATA_FILES`.
- No frameworks, no npm packages, no build tools, no CDN scripts. The only external resource allowed is the Google Fonts stylesheet (Plus Jakarta Sans), and the app must still work offline using the font fallback.
- Keep CSS inside `index.html` and JS inside `index.js` (the collocations page keeps its own in `collocations.html` / `collocations.js`, same rules: classic IIFE script, works over `file://`). Don't add new top-level files unless the user asks.
- Collocations: each item in `GROUPS` has `phrase`, `vi` (short Vietnamese meaning) and `example`. The example wraps the collocation, as it appears in the sentence, in `[square brackets]` exactly once; the page highlights it. Group `area` is `everyday` or `software`. The page has an All / Everyday / Software filter, a search box (`/` focuses it), a per-item "mark as practised" check toggle (saved by phrase in `localStorage` under `speakup.collocations`, count shown next to the result count; phrases must stay unique) and a back link to `index.html`; `index.html` links to it from the intro.
- Don't add features the user didn't ask for. In particular, don't re-add:
  - text-to-speech or speaker buttons
  - topic emoji/icons (the `logo-mark` and UI SVG icons stay)
  - band score labels such as "Band 6.0–6.5", in the UI or in data

## 3. Data format

Each topic is one file in `data/` that calls `window.SPEAKUP_TOPICS.push({...})`:

```js
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "kebab-case-id",           // unique, matches the file name
  name: "Display Name",
  questions: [
    {
      part: 1,                   // 1, 2 or 3
      question: "…?",
      cues: ["…", "and explain …"], // required for part 2, omit otherwise
      sample: {
        point: "…",
        explanation: "…",
        example: "…",
        link: "…",
      },
      // Hint step 1: one entry per PEEL part, specific to THIS question
      peel: {
        point:       { idea: "What to say here (short)", vocab: ["phrase from sample.point", "…"] },
        explanation: { idea: "…", vocab: ["…"] },
        example:     { idea: "…", vocab: ["…"] },
        link:        { idea: "…", vocab: ["…"] },
      },
    },
  ],
});
```

- Adding a topic means two steps: create `data/<id>.js` and add `<id>` to `DATA_FILES` in `index.js`.
- Question ids are derived as `<topic.id>-<index>`. Saved progress and URL hashes depend on them, so only append new questions to existing topics. Don't reorder or delete existing questions unless the user asks.
- Each topic should cover at least Part 1, Part 3 and, if it fits, one Part 2 cue card. Put questions in the order Part 1 → 2 → 3.
- Escape quotes correctly inside JS strings and keep the files valid plain JS (no trailing `export`).

## 4. Sample answer content

- Every answer must follow PEEL:
  - **Point:** answer the question directly in the first sentence.
  - **Explanation:** say why.
  - **Example:** give a concrete personal or real-world example ("For example…", "For instance…").
  - **Link:** tie back to the question or conclude ("So…", "That's why…").
- Use natural spoken British-leaning English, suitable for band 6.0 and above. Use clear linking words and a few less common collocations, but not memorised-sounding or overly academic language.
- Target length:
  - Part 1: 3–5 sentences in total.
  - Part 2: about 2 minutes spoken (~250–320 words). Cover every cue.
  - Part 3: 4–7 sentences with an opinion and a reason.
- Every question needs a `peel` hint for all four parts:
  - `idea` is a short instruction (about 3–10 words) that tells the learner what to say in that part of this specific answer. Generic text like "Say why" is not enough.
  - `vocab` lists 1–5 phrases copied exactly from the matching `sample` part, since the UI highlights them in the sample. A case-insensitive substring match is required.
- There is no top-level `vocab` field any more.
- Technical topics (data structures, algorithms, maths) are asked as what / how / why / when-to-use / when-not / real-world use. They must stay technically accurate. When the user gives a source URL, base the facts on that source and put the URL in a comment at the top of the data file.

## 5. UI / UX

- Brilliant.org-inspired style:
  - white background, bold dark ink, Plus Jakarta Sans
  - chunky "3D" buttons (`.btn` with bottom shadow that presses down)
  - a pastel tint and accent colour per topic (from `PALETTE` in `index.js`)
- Mobile first. Design for 375px width and check that 320px works. Primary actions live in the fixed bottom bar: search, Hint, Random.
- Nothing may overflow horizontally except the topic tiles row, which scrolls on purpose. The Part filter must always show All, Part 1, Part 2 and Part 3 in one row.
- Current behaviour that must be preserved:
  - Selecting a topic or a part shows the first question of that filter, lowest part first.
  - Random jumps to a different random topic that has questions for the current part filter, and shows its first question.
  - Prev / next arrows step through the current filtered list and wrap around.
  - The Hint button cycles through three states:
    - Hint: the per-question PEEL guide, showing the idea plus phrase chips for each part.
    - Sample: the colour-coded PEEL answer with the hint phrases highlighted.
    - Hide.
  - Part 2 has a 1 min prepare + 2 min speak timer.
  - "Mark as practised" progress is saved in `localStorage` under `speakup.practised`.
  - The URL hash (`#<question-id>`) opens that question.
  - Keyboard shortcuts: `R`, `H`, `D`, `/`, `←`, `→`.
  - Speaking: a floating mic button (`#btn-mic`, above the bottom bar on the right) starts and stops live speech-to-text through the browser's Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`, `en-US`). It is hidden when the API is missing. The transcript appears in a "Your answer" panel on the card with a word count and a Clear button. It is kept in memory per question and stops when the question changes. Each final chunk is logged with `console.info("[speakup] …")`, and `window.speakup.current()` / `.all()` / `.listening()` let an AI agent (e.g. Chrome DevTools MCP) read it. This is speech-to-text only, not text-to-speech. In Chrome it needs internet, and errors show a toast.
  - Slow-network loading: the Google Fonts stylesheet loads without blocking the page (`media="print"` swap). Data files download in parallel (`async = false` keeps the `DATA_FILES` order). Until they load, the progress pill, tiles and card show static skeleton placeholders in `index.html`, and Search / Hint / Random stay disabled. If loading fails, a card appears with a "Try again" button.
- Keep button labels short enough not to wrap on a 375px screen.

## 6. Code quality, accessibility, security

- Match the existing style: small functions, `const`/`let`, template strings, two-space indent, comments only where intent isn't obvious.
- Pass every piece of data text through `escapeHtml()` before inserting it with `innerHTML`.
- Wrap `localStorage` access in `try/catch`.
- Use real `<button>` elements with `aria-label` for icon-only buttons and `aria-pressed` / `aria-expanded` for toggles. Hidden hint panels use `aria-hidden`. Keep visible focus styles.
- Respect `prefers-reduced-motion`. Animations must never hide content permanently.

## 7. Verification (required before saying a task is done)

1. Syntax-check all scripts:
   ```sh
   for f in index.js data/*.js; do node --check "$f" || echo "FAIL $f"; done
   ```
2. Validate the data. Every question must have:
   - `part` in 1–3 and a `question`
   - all four PEEL `sample` fields as non-empty strings
   - `cues` when `part === 2`
   - a `peel` entry for each part, with an `idea` and a non-empty `vocab`, where every phrase is found in the matching sample part Check that every name in `DATA_FILES` has a matching file. A quick Node script that stubs `global.window = { SPEAKUP_TOPICS: [] }` and `require`s each file is enough.
3. Open the app over `file://` in headless Chrome and confirm it renders, for example:
   ```sh
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
     --allow-file-access-from-files --user-data-dir=/tmp/su-prof --virtual-time-budget=3000 \
     --dump-dom "file://$PWD/index.html#<question-id>"
   ```
   For layout changes, take screenshots at 375px and 320px. Headless Chrome enforces a minimum window width, so put the app in `<iframe width="375">` inside a temporary preview page. Headless virtual time doesn't run CSS transitions, so disable transitions in the preview before measuring heights.
4. Delete all temporary files (preview pages, screenshots, `/tmp` profiles) and stop any server you started.
5. Update `readme.md` whenever features, shortcuts or the data format change. Update this file whenever a rule changes.
