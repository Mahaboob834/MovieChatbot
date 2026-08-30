/* =========================================================================
   Reel Buddy — TMDB-powered movie recommendation chatbot.
   No local dataset, no backend: every lookup and recommendation is a live
   call to The Movie Database (TMDB) API, made directly from the browser
   with the visitor's own free API key.
   ========================================================================= */

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w92";
const STORAGE_KEY = "reelbuddy_tmdb_api_key";

const GREETINGS = [
  "Hello! I'm your movie buddy.",
  "Hi there! Ready to discover some movies?",
  "Hey! Let's find you a movie to watch."
];
const BYE = ["Goodbye!", "See you later!", "Happy watching!"];

// NOTE: this key is embedded directly in client-side code, so it is visible
// to anyone who views this page's source or network requests. Do not use a
// key you need to keep private; treat this as a public/demo key.
const EMBEDDED_API_KEY = "53b6620507a7b71ecbc37dc73259c1cd";

let apiKey = localStorage.getItem(STORAGE_KEY) || EMBEDDED_API_KEY;

/* ------------------------------ TMDB calls ------------------------------ */

async function tmdbFetch(path, params = {}) {
  const url = new URL(TMDB_BASE + path);
  url.searchParams.set("api_key", apiKey);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.status_message || `TMDB request failed (${res.status})`);
  }
  return res.json();
}

async function verifyApiKey(key) {
  const url = new URL(TMDB_BASE + "/configuration");
  url.searchParams.set("api_key", key);
  const res = await fetch(url.toString());
  return res.ok;
}

async function searchMovie(query) {
  const data = await tmdbFetch("/search/movie", { query, include_adult: "false" });
  return (data.results || [])[0] || null;
}

async function getRecommendations(movieId) {
  let data = await tmdbFetch(`/movie/${movieId}/recommendations`);
  if (!data.results || data.results.length === 0) {
    data = await tmdbFetch(`/movie/${movieId}/similar`);
  }
  return (data.results || []).slice(0, 5);
}

/* ------------------------------ Chat UI --------------------------------- */

const chatEl = document.getElementById("chat");

function appendMessage(content, who = "bot", asHtml = false) {
  const div = document.createElement("div");
  div.className = `msg msg--${who}`;
  if (asHtml) div.innerHTML = content; else div.textContent = content;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function renderRecommendations(sourceTitle, movies) {
  let html = `Because you mentioned <span class="highlight">${escapeHtml(sourceTitle)}</span>, you might also enjoy:<ul class="rec-list">`;
  movies.forEach(m => {
    const year = (m.release_date || "").slice(0, 4) || "—";
    const poster = m.poster_path
      ? `<img src="${IMG_BASE}${m.poster_path}" alt="">`
      : `<div class="rec-poster-fallback">No<br>Art</div>`;
    html += `<li class="rec-item">${poster}<div class="rec-meta"><span class="rec-title">${escapeHtml(m.title)}</span><span class="rec-year">${year}</span></div></li>`;
  });
  html += `</ul>`;
  appendMessage(html, "bot", true);
}

/* ------------------------------ API key box ------------------------------ */

const statusEl = document.getElementById("api-status");
const keyInput = document.getElementById("api-key-input");
const saveKeyBtn = document.getElementById("save-key-btn");

function setStatus(connected) {
  statusEl.textContent = connected ? "Connected ✓" : "Not connected";
  statusEl.classList.toggle("connected", connected);
  statusEl.classList.toggle("disconnected", !connected);
}

async function initApiKey() {
  keyInput.value = apiKey;
  if (!apiKey) { setStatus(false); return; }
  saveKeyBtn.textContent = "Checking…";
  const ok = await verifyApiKey(apiKey).catch(() => false);
  setStatus(ok);
  saveKeyBtn.textContent = "Save Key";
  if (!ok) {
    appendMessage("The saved TMDB API key no longer works — please re-enter it.", "bot");
  }
}

saveKeyBtn.addEventListener("click", async () => {
  const value = keyInput.value.trim();
  if (!value) {
    appendMessage("Please paste a TMDB API key first.", "bot");
    return;
  }
  saveKeyBtn.disabled = true;
  saveKeyBtn.textContent = "Checking…";
  const ok = await verifyApiKey(value).catch(() => false);
  saveKeyBtn.disabled = false;
  saveKeyBtn.textContent = "Save Key";

  if (ok) {
    apiKey = value;
    localStorage.setItem(STORAGE_KEY, value);
    setStatus(true);
    appendMessage("API key saved and verified. Tell me a movie you like!", "bot");
  } else {
    setStatus(false);
    appendMessage("That key didn't work with TMDB — double check it and try again.", "bot");
  }
});

/* -------------------------------- Chat logic ----------------------------- */

async function handleUserMessage(raw) {
  const userInput = raw.trim();
  if (!userInput) return;
  appendMessage(userInput, "user");

  if (["exit", "bye", "quit"].includes(userInput.toLowerCase())) {
    appendMessage(BYE[Math.floor(Math.random() * BYE.length)], "bot");
    return;
  }

  if (!apiKey) {
    appendMessage("I need a TMDB API key first — paste one in the box on the left and hit Save Key.", "bot");
    return;
  }

  const loadingMsg = appendMessage("Searching TMDB…", "bot");

  try {
    const movie = await searchMovie(userInput);
    if (!movie) {
      loadingMsg.textContent = `I couldn't find a movie matching "${userInput}" on TMDB. Try a different title!`;
      return;
    }

    const recs = await getRecommendations(movie.id);
    loadingMsg.remove();

    if (recs.length === 0) {
      appendMessage(`I found "${movie.title}", but TMDB doesn't have similar-movie data for it yet.`, "bot");
    } else {
      renderRecommendations(movie.title, recs);
    }
  } catch (err) {
    loadingMsg.textContent = `Something went wrong talking to TMDB: ${err.message}`;
  }
}

document.getElementById("composer").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("user-input");
  handleUserMessage(input.value);
  input.value = "";
  input.focus();
});

/* --------------------------------- Init ---------------------------------- */

(async function init() {
  appendMessage(GREETINGS[Math.floor(Math.random() * GREETINGS.length)], "bot");
  appendMessage("I look up movies and recommendations live from TMDB — no dataset file needed. Save your free API key on the left to get started.", "bot");
  await initApiKey();
})();
