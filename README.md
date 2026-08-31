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

]

## How It Works

1. The user enters a movie title.
2. The app searches TMDB for the closest matching title (`/search/movie`).
3. It fetches TMDB's built-in recommendations for that movie's ID (`/movie/{id}/recommendations`).
4. The top results are displayed as a list of suggested titles.

## Tech Stack

- HTML / CSS / vanilla JavaScript (web version)
- Python + [`requests`](https://pypi.org/project/requests/) (CLI version)
- [TMDB API](https://developer.themoviedb.org/docs)


## License

This project is provided as-is for personal/educational use. Movie data is provided by [TMDB](https://www.themoviedb.org/) — this product uses the TMDB API but is not endorsed or certified by TMDB.
