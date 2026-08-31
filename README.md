# 🎬 Movie Buddy

A friendly movie recommendation chatbot that uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to suggest similar movies based on a title you like. Available as both a web chat interface and a Python CLI script.

## Features

- 🔍 Search for any movie by title
- 🍿 Get up to 5 similar movie recommendations powered by TMDB's recommendation engine
- 💬 Clean, chat-style web UI with a typing indicator
- 🐍 Lightweight Python CLI version for terminal use

## Demo

Type a movie you enjoyed (e.g. `Inception`) and Movie Buddy will reply with a handful of similar titles pulled from TMDB.

## Project Structure

```
.
├── index.html          # Chat UI markup
├── style.css            # Chat UI styling
├── movie_chatbot.py      # Python CLI version
└── README.md
```

## Getting Started

### Web Version

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/movie-buddy.git
   cd movie-buddy
   ```
2. Open `index.html` in your browser (no build step or server required).
3. Type a movie title and hit **Send**.

### Python CLI Version

1. Install dependencies:
   ```bash
   pip install requests
   ```
2. Run the script:
   ```bash
   python movie_chatbot.py
   ```
3. Enter a movie title when prompted.

## Configuration

Both versions call the TMDB API and require an API key.

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/) and generate an API key from your account settings.
2. Set your key:
   - **Web:** update the `TMDB_API_KEY` constant near the top of the `<script>` block in `index.html`.
   - **Python:** update the `TMDB_API_KEY` variable at the top of `movie_chatbot.py`.

> ⚠️ **Security note:** Don't commit real API keys to a public repository. The current code has the key hardcoded directly in the source, which exposes it to anyone who views the repo. Before pushing to GitHub, replace it with a placeholder (e.g. `"YOUR_TMDB_API_KEY"`) and instead load it from an environment variable (Python) or a build-time config / backend proxy (web), and consider rotating the key if it's already been shared.

## How It Works

1. The user enters a movie title.
2. The app searches TMDB for the closest matching title (`/search/movie`).
3. It fetches TMDB's built-in recommendations for that movie's ID (`/movie/{id}/recommendations`).
4. The top results are displayed as a list of suggested titles.

## Tech Stack

- HTML / CSS / vanilla JavaScript (web version)
- Python + [`requests`](https://pypi.org/project/requests/) (CLI version)
- [TMDB API](https://developer.themoviedb.org/docs)

## Roadmap Ideas

- [ ] Move the API key to a backend/proxy so it isn't exposed client-side
- [ ] Show movie posters and release years alongside recommendations
- [ ] Add genre-based filtering
- [ ] Handle multiple search results (currently only the top match is used)

## License

This project is provided as-is for personal/educational use. Movie data is provided by [TMDB](https://www.themoviedb.org/) — this product uses the TMDB API but is not endorsed or certified by TMDB.
