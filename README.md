# 🎬 Reel Buddy — Movie Recommendation Chatbot (TMDB Edition)

A movie recommendation chatbot that runs **entirely in the browser** — pure HTML, CSS, and JavaScript — and gets all of its movie data and recommendations **live from [The Movie Database (TMDB)](https://www.themoviedb.org/) API**. No local dataset file, no backend server.

This is a frontend port of a Python/Jupyter notebook that originally used `pandas` + a static `movies.dat`/`movies.csv` file with `scikit-learn` TF-IDF over genres. This version replaces the static dataset entirely with real-time TMDB search and recommendation endpoints.

## ✨ Features

- Chat-style UI themed like a cinema ticket booth
- Live movie search against TMDB's full catalog (not limited to a bundled sample)
- Uses TMDB's `/movie/{id}/recommendations` endpoint (falls back to `/movie/{id}/similar`) for genuinely good, TMDB-curated recommendations — no manual TF-IDF math needed
- Shows poster thumbnails and release years for each recommendation
- Your API key is verified on save and stored in your browser's `localStorage`, so you only enter it once
- Zero dependencies, zero build step — just open the page

## 📁 Project structure

```
movie-chatbot-tmdb/
├── index.html      # Page structure / chat UI + API key box
├── style.css       # Cinema-ticket theme
├── script.js       # TMDB API calls + chatbot logic
└── README.md
```

## 🔑 Getting a free TMDB API key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup).
2. Go to **Settings → API** (or [this direct link](https://www.themoviedb.org/settings/api)).
3. Request an API key (choose "Developer" — it's free and approved instantly for personal projects).
4. Copy the **API Key (v3 auth)** value — that's what this app uses.

## 🚀 Running it locally

Just open `index.html` in a browser — no server required, since there's no local file to fetch anymore (all data comes from TMDB over HTTPS).

```bash
# optional, if you prefer serving it:
python3 -m http.server 8000
```

Then:
1. Paste your TMDB API key into the box on the left.
2. Click **Save Key** — it's verified against TMDB before being stored.
3. Type a movie title in the chat and press **Send**.

## 🌐 Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose your branch (e.g. `main`) and root folder (`/`).
4. Save — GitHub will give you a live URL like `https://yourusername.github.io/reel-buddy/`.

No build step needed — it's a static site that talks directly to TMDB's API over HTTPS from the visitor's browser.

## 💬 How to chat with it

```
You: Inception
Reel Buddy: Because you mentioned "Inception", you might also enjoy:
  [poster] Interstellar (2014)
  [poster] The Dark Knight (2008)
  [poster] Shutter Island (2010)
  [poster] The Prestige (2006)
  [poster] Fight Club (1999)
```

Type `exit`, `bye`, or `quit` to end the chat.

## 🧠 How it works

1. Your message is sent as a search query to `GET /search/movie` on TMDB.
2. The top search result's TMDB movie ID is used to call `GET /movie/{id}/recommendations`.
3. If TMDB has no recommendations for that title, the app falls back to `GET /movie/{id}/similar`.
4. The top 5 results are rendered with poster art, title, and release year.

## ⚠️ Notes & limitations

- **API key exposure:** Because this is a pure client-side app, your TMDB API key is visible in the browser (network requests, dev tools) to anyone using the deployed page. TMDB's free key is rate-limited but not meant to be kept secret for public API use — for a truly private/public-safe deployment, you'd proxy requests through a small serverless function that holds the key server-side. For personal or local use, entering your own key directly is fine.
- Recommendation quality depends entirely on TMDB's own recommendation/similarity data — it's generally better than a genre-only TF-IDF model, since it's collaborative + metadata based.
- Search matches the single top TMDB result for whatever you type, so very generic queries may match an unexpected movie.
- Requires an internet connection (there's no offline dataset fallback in this version).

## 🛠️ Customizing the look

All theming lives in `style.css` as CSS custom properties at the top of the file (`--bg`, `--amber`, `--velvet`, etc.) — tweak those to reskin the whole app without touching the layout or logic.

## 📄 License

Free to use, modify, and distribute for any purpose.
