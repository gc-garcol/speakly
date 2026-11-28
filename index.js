// Speak Up — IELTS Speaking practice
// Uses classic <script> loading (no ES modules), so index.html works when opened directly via file://.
// To add a topic: create a file in ./data (same shape as the others) and add its name to DATA_FILES.
(function () {
"use strict";

const DATA_FILES = [
  "work-study", "technology", "hometown", "free-time", "travel",
  // Tech concepts (what / how / why / when)
  "bayes-theorem", "timer-wheel", "skip-list",
  "quantitative", "algorithms", "data-structures", "math",
  "cache-strategies", "java-memory-model",
  "matrices", "determinants", "matrix-rank",
  "expectation-variance",
];

// Each data file calls window.SPEAKUP_TOPICS.push({...})
window.SPEAKUP_TOPICS = [];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    // async=false: download in parallel but execute in insertion order, so topics keep the order of DATA_FILES
    s.async = false;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(s);
  });
}

Promise.all(DATA_FILES.map((name) => loadScript(`./data/${name}.js`)))
  .then(() => startApp(window.SPEAKUP_TOPICS))
  .catch((err) => {
    const main = document.getElementById("main");
    main.innerHTML =
      `<div class="card empty"><div class="big" aria-hidden="true">⚠️</div><h2>Couldn't load questions</h2>
        <p>Check your connection and try again.</p>
        <button class="btn btn-dark" id="btn-retry" style="margin-top:18px">Try again</button></div>`;
    main.querySelector("#btn-retry").addEventListener("click", () => location.reload());
    document.getElementById("app").removeAttribute("aria-busy");
    console.error(err);
  });

function startApp(TOPICS) {

// Colour per topic (accent + light tint). Topics beyond the palette reuse it.
const PALETTE = [
  { accent: "#2f6bff", tint: "#eaf1ff" },
  { accent: "#7b4dff", tint: "#f1ebff" },
  { accent: "#f26b1d", tint: "#fff0e6" },
  { accent: "#e5457a", tint: "#ffeaf1" },
  { accent: "#0f9d8a", tint: "#e3f7f3" },
  { accent: "#c2410c", tint: "#fdeee4" },
  { accent: "#0e7490", tint: "#e2f4f8" },
  { accent: "#6d28d9", tint: "#efe8fd" },
  { accent: "#15803d", tint: "#e6f6ea" },
  { accent: "#b45309", tint: "#fdf3e1" },
  { accent: "#be185d", tint: "#fde8f1" },
  { accent: "#1d4ed8", tint: "#e6edfd" },
];
const ALL_COLOR = { accent: "#141414", tint: "#f2f2ef" };

// Every sample answer follows PEEL: Point – Explanation – Example – Link
const PEEL = [
  { key: "point", letter: "P", label: "Point", hint: "Answer the question directly" },
  { key: "explanation", letter: "E", label: "Explanation", hint: "Say why" },
  { key: "example", letter: "E", label: "Example", hint: "Give a real or personal example" },
  { key: "link", letter: "L", label: "Link", hint: "Link back to the question" },
];

const PREP_SECONDS = 60;
const SPEAK_SECONDS = 120;
const STORAGE_KEY = "speakup.practised";

const ALL = TOPICS.flatMap((topic, ti) => {
  topic.color = PALETTE[ti % PALETTE.length];
  return topic.questions.map((q, i) => ({ ...q, id: `${topic.id}-${i}`, topic }));
});
const BY_ID = new Map(ALL.map((q) => [q.id, q]));

const state = {
  topic: "all",
  part: 0,
  current: null,
  hintLevel: 0, // 0 = hidden, 1 = PEEL guide, 2 = guide + sample
  done: loadDone(),
};
const timer = { phase: "idle", remaining: 0, total: 0, handle: null };

// ---------- Persistence ----------
function loadDone() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter((id) => BY_ID.has(id)));
  } catch {
    return new Set();
  }
}
function saveDone() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.done]));
  } catch {
    /* storage unavailable (private mode) – progress just won't persist */
  }
}

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const els = {
  tiles: $("#tiles"),
  parts: $("#parts"),
  main: $("#main"),
  hintBtn: $("#btn-hint"),
  hintLabel: $("#hint-label"),
  randomBtn: $("#btn-random"),
  searchBtn: $("#btn-search"),
  sheet: $("#sheet"),
  closeBtn: $("#btn-close"),
  search: $("#search"),
  results: $("#results"),
  resultCount: $("#result-count"),
  pill: $("#progress-pill"),
  toast: $("#toast"),
  micBtn: $("#btn-mic"),
};

const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>',
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
// Escape text, then underline the suggested phrases (first occurrence each) so the hint links to the sample
function markPhrases(text, phrases = []) {
  let html = escapeHtml(text);
  for (const p of [...phrases].sort((a, b) => b.length - a.length)) {
    const re = new RegExp(`(?![^<]*>)(${escapeHtml(p).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i");
    html = html.replace(re, '<mark class="phrase">$1</mark>');
  }
  return html;
}
const fmt = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

let toastTimer;
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1800);
}

// ---------- Filtering ----------
const matchesFilter = (q) =>
  (state.topic === "all" || q.topic.id === state.topic) && (state.part === 0 || q.part === state.part);
const pool = () => ALL.filter(matchesFilter);

// First question of the current filter, lowest part first (Part 1 → 2 → 3)
function firstQuestion() {
  const list = pool();
  if (!list.length) return null;
  return list.reduce((best, q) => (q.part < best.part ? q : best), list[0]);
}

// Random button: jump to a random *topic* (not the current one) and start at its first question.
// Only topics that have questions for the selected part are considered.
function randomTopic() {
  const candidates = TOPICS.filter(
    (t) => t.id !== state.topic && t.questions.some((q) => state.part === 0 || q.part === state.part)
  );
  if (!candidates.length) return;
  state.topic = candidates[Math.floor(Math.random() * candidates.length)].id;
  renderTiles();
  els.tiles.querySelector('[aria-pressed="true"]')?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  show(firstQuestion());
}

function resetFiltersFor(q) {
  if (matchesFilter(q)) return;
  state.topic = "all";
  state.part = 0;
  renderTiles();
  renderParts();
}

// ---------- Rendering ----------
function renderProgress(bump = false) {
  els.pill.innerHTML = `<span class="dot" aria-hidden="true">✓</span>${state.done.size}<span style="color:var(--faint)">/${ALL.length}</span><span class="sr-only"> questions practised</span>`;
  if (bump) {
    els.pill.classList.remove("bump");
    void els.pill.offsetWidth;
    els.pill.classList.add("bump");
  }
}

function renderTiles() {
  const items = [{ id: "all", name: "All topics", color: ALL_COLOR, ids: ALL.map((q) => q.id) }].concat(
    TOPICS.map((t) => ({ id: t.id, name: t.name, color: t.color, ids: t.questions.map((_, i) => `${t.id}-${i}`) }))
  );
  els.tiles.innerHTML = items
    .map((t) => {
      const done = t.ids.filter((id) => state.done.has(id)).length;
      const pct = Math.round((done / t.ids.length) * 100);
      return `<button class="tile" data-topic="${t.id}" aria-pressed="${state.topic === t.id}"
          style="--tile-tint:${t.color.tint};--tile-accent:${t.color.accent}">
        <span class="tile-name">${escapeHtml(t.name)}</span>
        <span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${pct}%"></span></span>
        <span class="tile-meta">${done}/${t.ids.length} practised</span>
      </button>`;
    })
    .join("");
}

function renderParts() {
  els.parts.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.part) === state.part)));
}

function updateHintButton() {
  const labels = ["Hint", "Sample", "Hide"];
  els.hintLabel.textContent = labels[state.hintLevel];
  els.hintBtn.setAttribute("aria-expanded", String(state.hintLevel > 0));
}

// direction: 1 = slide in from right, -1 = from left, 0 = no animation
function renderQuestion(direction = 1) {
  const q = state.current;
  stopTimer();

  if (!q) {
    els.main.innerHTML = `<div class="card empty"><div class="big" aria-hidden="true">🔍</div><h2>Nothing here yet</h2><p>Try another topic or part.</p></div>`;
    els.hintBtn.disabled = true;
    return;
  }
  els.hintBtn.disabled = false;
  document.documentElement.style.setProperty("--accent", q.topic.color.accent);
  document.documentElement.style.setProperty("--tint", q.topic.color.tint);

  const list = pool();
  const isDone = state.done.has(q.id);
  const peelSample = PEEL.filter((p) => q.sample[p.key])
    .map(
      (p) => `<div class="peel-row peel-${p.key}">
        <span class="peel-tag"><b aria-hidden="true">${p.letter}</b>${p.label}</span>
        <p>${markPhrases(q.sample[p.key], q.peel?.[p.key]?.vocab)}</p>
      </div>`
    )
    .join("");
  // Per-question PEEL guide: what to say in each part + phrases taken from that part of the sample
  const structure = PEEL.map((p) => {
    const h = q.peel?.[p.key] || {};
    const words = h.vocab?.length
      ? `<span class="sr-only">Useful phrases:</span><span class="peel-vocab">${h.vocab.map((v) => `<span>${escapeHtml(v)}</span>`).join("")}</span>`
      : "";
    return `<li class="peel-${p.key}">
      <b aria-hidden="true">${p.letter}</b>
      <span class="peel-body">
        <strong>${p.label}</strong>
        <span class="peel-idea">${escapeHtml(h.idea || p.hint)}</span>
        ${words}
      </span>
    </li>`;
  }).join("");
  const lengthTip = { 1: "Aim for 2–4 sentences.", 2: "Keep talking for the full 2 minutes.", 3: "Aim for 4–6 sentences with an example." }[q.part];

  const cues = q.cues?.length
    ? `<p class="cues-label">You should say:</p>
       <ul class="cues">${q.cues.map((c, i) => `<li><span aria-hidden="true">${i + 1}</span>${escapeHtml(c)}</li>`).join("")}</ul>
       <div class="timer" id="timer">
         <div class="ring" aria-hidden="true"><svg viewBox="0 0 48 48"><circle class="track" cx="24" cy="24" r="20"/><circle class="prog" id="ring-prog" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="0"/></svg></div>
         <div class="timer-info">
           <div class="timer-time" id="timer-time">${fmt(PREP_SECONDS)}</div>
           <div class="timer-label" id="timer-label">1 min to prepare, 2 min to speak</div>
         </div>
         <button class="btn btn-sm" id="timer-btn">Start</button>
       </div>`
    : "";

  els.main.innerHTML = `
    <article class="card${direction > 0 ? " enter" : direction < 0 ? " enter-back" : ""}" aria-labelledby="q-text">
      <div class="card-hero">
        <div class="card-top">
          <div class="badges">
            <span class="badge badge-part">Part ${q.part}</span>
            <span class="badge">${escapeHtml(q.topic.name)}</span>
            ${isDone ? '<span class="badge badge-done">✓ Practised</span>' : ""}
          </div>
        </div>
        <h2 class="question" id="q-text">${escapeHtml(q.question)}</h2>
      </div>

      <div class="card-body">
        ${cues}

        <section class="speech" id="speech" aria-labelledby="speech-title" hidden>
          <div class="speech-head">
            <span class="speech-title" id="speech-title"><span class="speech-dot" aria-hidden="true"></span>Your answer</span>
            <span class="speech-count" id="speech-count"></span>
            <button class="btn btn-sm" id="speech-clear">Clear</button>
          </div>
          <p class="speech-text" id="speech-text" aria-live="polite"></p>
        </section>

        <div class="step${state.hintLevel >= 1 ? " show" : ""}" id="step-ideas" aria-hidden="${state.hintLevel < 1}">
          <div><div class="panel panel-ideas">
            <div class="panel-head"><span class="panel-title"><span class="em" aria-hidden="true">💡</span>Answer with PEEL</span></div>
            <ul class="structure">${structure}</ul>
            <p class="tip">${lengthTip}</p>
          </div></div>
        </div>

        <div class="step${state.hintLevel >= 2 ? " show" : ""}" id="step-sample" aria-hidden="${state.hintLevel < 2}">
          <div><div class="panel panel-sample">
            <div class="panel-head">
              <span class="panel-title"><span class="em" aria-hidden="true">🗣️</span>Sample answer</span>
            </div>
            <div class="sample">${peelSample}</div>
          </div></div>
        </div>

        <button class="btn btn-done" id="btn-done" aria-pressed="${isDone}">${ICON.check}${isDone ? "Practised" : "Mark as practised"}</button>

        <nav class="card-foot" aria-label="Question navigation">
          <button class="btn btn-sm btn-icon" id="btn-prev" aria-label="Previous question" ${list.length > 1 ? "" : "disabled"}>${ICON.back}</button>
          <span class="counter">${list.indexOf(q) + 1} / ${list.length}</span>
          <button class="btn btn-sm btn-icon" id="btn-next" aria-label="Next question" ${list.length > 1 ? "" : "disabled"}>${ICON.next}</button>
        </nav>
      </div>
    </article>`;

  updateHintButton();
  renderSpeech();
}

function show(q, { direction = 1 } = {}) {
  if (q !== state.current) stopSpeech();
  state.current = q;
  state.hintLevel = 0;
  if (q) history.replaceState(null, "", `#${q.id}`);
  renderQuestion(direction);
}

function nextHint() {
  if (!state.current) return;
  state.hintLevel = (state.hintLevel + 1) % 3;
  const ideas = $("#step-ideas");
  const sample = $("#step-sample");
  ideas.classList.toggle("show", state.hintLevel >= 1);
  ideas.setAttribute("aria-hidden", String(state.hintLevel < 1));
  sample.classList.toggle("show", state.hintLevel >= 2);
  sample.setAttribute("aria-hidden", String(state.hintLevel < 2));
  updateHintButton();
  const target = state.hintLevel === 2 ? sample : state.hintLevel === 1 ? ideas : null;
  if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "nearest" }), 250);
}

function toggleDone() {
  const q = state.current;
  if (!q) return;
  if (state.done.has(q.id)) state.done.delete(q.id);
  else {
    state.done.add(q.id);
    const msgs = ["Nice work! 🎉", "Keep it up! 🔥", "Great job! ⭐", "One more down! 💪"];
    toast(`${msgs[Math.floor(Math.random() * msgs.length)]} ${state.done.size}/${ALL.length} practised`);
  }
  saveDone();
  renderProgress(true);
  renderTiles();
  renderQuestion(false);
}

// ---------- Part 2 timer ----------
function stopTimer() {
  clearInterval(timer.handle);
  Object.assign(timer, { phase: "idle", remaining: 0, total: 0, handle: null });
}

function updateTimerUI() {
  const box = $("#timer");
  if (!box) return;
  const circumference = 125.66;
  const labels = {
    idle: "1 min to prepare, 2 min to speak",
    prep: "Prepare: jot down key words",
    speak: "Speak now!",
    done: "Time's up. Well done! 🎉",
  };
  box.className = `timer ${timer.phase}`;
  $("#timer-label").textContent = labels[timer.phase];
  $("#timer-time").textContent = fmt(timer.phase === "idle" ? PREP_SECONDS : timer.remaining);
  const ratio = timer.total ? timer.remaining / timer.total : 1;
  $("#ring-prog").style.strokeDashoffset = String(circumference * (1 - ratio));
  $("#timer-btn").textContent = timer.phase === "idle" ? "Start" : timer.phase === "done" ? "Again" : "Reset";
}

function runPhase(phase, seconds) {
  clearInterval(timer.handle);
  Object.assign(timer, { phase, remaining: seconds, total: seconds });
  updateTimerUI();
  timer.handle = setInterval(() => {
    timer.remaining -= 1;
    if (timer.remaining <= 0) {
      if (timer.phase === "prep") {
        navigator.vibrate?.(100);
        return runPhase("speak", SPEAK_SECONDS);
      }
      clearInterval(timer.handle);
      timer.remaining = 0;
      timer.phase = "done";
      navigator.vibrate?.(200);
    }
    updateTimerUI();
  }, 1000);
}

function onTimerButton() {
  if (timer.phase === "idle" || timer.phase === "done") runPhase("prep", PREP_SECONDS);
  else {
    stopTimer();
    updateTimerUI();
  }
}

// ---------- Speaking (live speech-to-text) ----------
// Uses the browser's Web Speech API. Chrome sends the audio to Google's servers, so it needs internet;
// the button is hidden where the API doesn't exist (e.g. Firefox).
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SPEECH_LANG = "en-US";
const speech = { rec: null, on: false, qid: null, interim: "" };
const transcripts = new Map(); // question id -> final text (kept in memory for this visit)

const wordCount = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

function renderSpeech() {
  const box = $("#speech");
  const q = state.current;
  if (!box || !q) return;
  const live = speech.on && speech.qid === q.id;
  const text = transcripts.get(q.id) || "";
  const interim = live ? speech.interim : "";
  box.hidden = !live && !text;
  box.classList.toggle("live", live);
  $("#speech-text").innerHTML =
    text || interim
      ? `${escapeHtml(text)}${interim.trim() ? ` <span class="interim">${escapeHtml(interim.trim())}</span>` : ""}`
      : '<span class="placeholder">Listening… start speaking.</span>';
  const n = wordCount(text);
  $("#speech-count").textContent = `${n} word${n === 1 ? "" : "s"}`;
}

function renderMic() {
  els.micBtn.setAttribute("aria-pressed", String(speech.on));
  els.micBtn.setAttribute("aria-label", speech.on ? "Stop speaking" : "Start speaking");
}

function addFinal(qid, chunk) {
  const piece = chunk.trim();
  if (!piece) return;
  const text = [transcripts.get(qid), piece].filter(Boolean).join(" ");
  transcripts.set(qid, text);
  // Lets an AI agent watching the page (e.g. via Chrome DevTools) follow along
  console.info(`[speakup] ${qid}: ${piece}`);
}

function createRecognition() {
  const rec = new Recognition();
  rec.lang = SPEECH_LANG;
  rec.continuous = true;
  rec.interimResults = true;
  rec.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) addFinal(speech.qid, r[0].transcript);
      else interim += r[0].transcript;
    }
    speech.interim = interim;
    renderSpeech();
  };
  rec.onerror = (e) => {
    if (e.error === "no-speech" || e.error === "aborted") return; // onend restarts or stops
    const msgs = {
      "not-allowed": "Microphone access is blocked",
      "service-not-allowed": "Speech recognition is blocked",
      "audio-capture": "No microphone found",
      network: "Speech-to-text needs internet",
    };
    toast(msgs[e.error] || "Speech-to-text stopped");
    stopSpeech();
  };
  // Chrome ends a session after a pause; keep listening until the user taps stop
  rec.onend = () => {
    if (!speech.on) return;
    try {
      rec.start();
    } catch {
      stopSpeech();
    }
  };
  return rec;
}

function startSpeech() {
  const q = state.current;
  if (!Recognition || !q || speech.on) return;
  speech.rec = speech.rec || createRecognition();
  Object.assign(speech, { on: true, qid: q.id, interim: "" });
  try {
    speech.rec.start();
  } catch {
    /* previous session still closing: its onend restarts it because speech.on is true */
  }
  renderMic();
  renderSpeech();
}

function stopSpeech() {
  if (!speech.on) return;
  speech.on = false;
  // Keep any words still in progress so nothing said is lost
  if (speech.interim) addFinal(speech.qid, speech.interim);
  speech.interim = "";
  speech.rec?.abort(); // abort, not stop: the interim words were just saved, so skip the late final result
  renderMic();
  renderSpeech();
}

const toggleSpeech = () => (speech.on ? stopSpeech() : startSpeech());

function clearSpeech() {
  const q = state.current;
  if (!q) return;
  transcripts.delete(q.id);
  speech.interim = "";
  renderSpeech();
  if (!speech.on) els.micBtn.focus(); // the Clear button disappears with the panel
}

// Read-only hook for AI agents (e.g. Chrome DevTools MCP): speakup.current() / speakup.all()
const entry = (id, text) => {
  const q = BY_ID.get(id);
  return { id, part: q.part, topic: q.topic.name, question: q.question, transcript: text, words: wordCount(text) };
};
window.speakup = Object.freeze({
  current: () => (state.current ? entry(state.current.id, transcripts.get(state.current.id) || "") : null),
  all: () => [...transcripts].map(([id, text]) => entry(id, text)),
  listening: () => speech.on,
});

// ---------- Search sheet ----------
function highlight(text, term) {
  const safe = escapeHtml(text);
  if (!term) return safe;
  const re = new RegExp(`(${escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return safe.replace(re, "<mark>$1</mark>");
}

function renderResults() {
  const term = els.search.value.trim();
  const t = term.toLowerCase();
  const list = ALL.filter((q) => !t || q.question.toLowerCase().includes(t) || q.topic.name.toLowerCase().includes(t));
  els.resultCount.textContent = term ? `${list.length} result${list.length === 1 ? "" : "s"}` : `${ALL.length} questions`;

  if (!list.length) {
    els.results.innerHTML = `<li class="no-results">No results for “${escapeHtml(term)}”</li>`;
    return;
  }
  let html = "";
  let last = null;
  for (const q of list) {
    if (q.topic !== last) {
      html += `<li class="group-title" aria-hidden="true">${escapeHtml(q.topic.name)}</li>`;
      last = q.topic;
    }
    html += `<li><button data-id="${q.id}" aria-current="${q === state.current}" style="--tint:${q.topic.color.tint};--accent:${q.topic.color.accent}">
      <span class="p-badge">P${q.part}</span><span class="q-text">${highlight(q.question, term)}</span>
      ${state.done.has(q.id) ? '<span class="q-check" aria-label="practised">✓</span>' : ""}
    </button></li>`;
  }
  els.results.innerHTML = html;
}

function openSheet() {
  els.search.value = "";
  renderResults();
  els.sheet.showModal();
  // Don't pop the keyboard up straight away on touch devices
  if (matchMedia("(hover: hover)").matches) els.search.focus();
  else els.closeBtn.focus();
}
const closeSheet = () => els.sheet.close();

// ---------- Events ----------
els.tiles.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-topic]");
  if (!btn || btn.dataset.topic === state.topic) return;
  state.topic = btn.dataset.topic;
  renderTiles();
  show(firstQuestion());
});

els.parts.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-part]");
  if (!btn || Number(btn.dataset.part) === state.part) return;
  state.part = Number(btn.dataset.part);
  renderParts();
  show(firstQuestion());
});

els.main.addEventListener("click", (e) => {
  if (e.target.closest("#timer-btn")) return onTimerButton();
  if (e.target.closest("#btn-done")) return toggleDone();
  if (e.target.closest("#speech-clear")) return clearSpeech();
  if (e.target.closest("#btn-prev")) return step(-1);
  if (e.target.closest("#btn-next")) return step(1);
});

// Move to the previous/next question in the current filtered list (wraps around)
function step(dir) {
  const list = pool();
  if (list.length < 2) return;
  const i = list.indexOf(state.current);
  show(list[(i + dir + list.length) % list.length], { direction: dir });
}

els.hintBtn.addEventListener("click", nextHint);
els.randomBtn.addEventListener("click", randomTopic);
els.micBtn.addEventListener("click", toggleSpeech);
els.searchBtn.addEventListener("click", openSheet);
els.closeBtn.addEventListener("click", closeSheet);
els.search.addEventListener("input", renderResults);
els.search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") els.results.querySelector("[data-id]")?.click();
});
els.sheet.addEventListener("click", (e) => {
  if (e.target === els.sheet) closeSheet(); // backdrop click
});
els.results.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;
  const q = BY_ID.get(btn.dataset.id);
  resetFiltersFor(q);
  closeSheet();
  show(q);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("keydown", (e) => {
  if (els.sheet.open || e.metaKey || e.ctrlKey || e.altKey || e.target.matches("input, textarea")) return;
  const key = e.key.toLowerCase();
  if (key === "r") randomTopic();
  else if (key === "h") nextHint();
  else if (key === "d") toggleDone();
  else if (key === "/") {
    e.preventDefault();
    openSheet();
  } else if (key === "arrowleft") step(-1);
  else if (key === "arrowright") step(1);
});

// ---------- Init ----------
// Buttons start disabled in index.html while the data loads
els.randomBtn.disabled = false;
els.searchBtn.disabled = false;
if (Recognition) {
  els.micBtn.hidden = false;
  els.micBtn.disabled = false;
}
$("#app").removeAttribute("aria-busy");
renderProgress();
renderTiles();
renderParts();
show(BY_ID.get(decodeURIComponent(location.hash.slice(1))) || firstQuestion(), { direction: 0 });
} // end startApp
})();
