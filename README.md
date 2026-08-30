# 🎬 Movie Recommendation Chatbot

A simple Python chatbot that takes a movie title from the user, looks it up on
[The Movie Database (TMDB)](https://www.themoviedb.org/), and suggests similar
movies using TMDB's built-in recommendation engine.

## Open in Google Colab

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/YOUR_REPO/blob/main/movie_chatbot.ipynb)

> Replace `YOUR_USERNAME/YOUR_REPO` with your actual GitHub username and repo
> name once uploaded. If you upload the `.py` file instead of a notebook, this
> badge won't work — see "Using this as a Notebook" below for how to make a
> matching `.ipynb`.

## Features

- Searches for a movie by name using the TMDB API
- Retrieves TMDB's own list of recommended similar movies
- Simple command-line / interactive chatbot interface

## Requirements

- Python 3.7+
- A free TMDB API key ([get one here](https://www.themoviedb.org/settings/api))
- The `requests` library

## Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Install dependencies**
   ```bash
   pip install requests
   ```

3. **Set your TMDB API key as an environment variable**

   Don't hardcode your API key in the script — it's much safer to keep it
   out of files you upload to GitHub.

   ```bash
   # macOS / Linux
   export TMDB_API_KEY="your_api_key_here"

   # Windows (PowerShell)
   $env:TMDB_API_KEY="your_api_key_here"
   ```

4. **Run the chatbot**
   ```bash
   python movie_chatbot.py
   ```

## Using this in Google Colab

If you'd rather run it in Colab instead of locally:

1. Upload `movie_chatbot.py` to a Colab notebook, or copy its contents into a cell.
2. In a Colab cell, set your API key using Colab's secrets manager (recommended)
   or an environment variable:
   ```python
   import os
   os.environ["TMDB_API_KEY"] = "your_api_key_here"  # or use Colab Secrets
   ```
3. Run the cell containing the chatbot code.

## ⚠️ A note on API keys and GitHub

Never commit real API keys to a public GitHub repository. If a key has
already been shared or exposed, regenerate it from your
[TMDB account settings](https://www.themoviedb.org/settings/api) so the old
one stops working.

## License

Feel free to use and modify this project for personal or educational purposes.
