"""
Movie Recommendation Chatbot
-----------------------------
A simple chatbot that takes a movie title from the user, looks it up on
The Movie Database (TMDB), and returns a list of recommended movies
using TMDB's own recommendation engine.

Setup:
    1. Get a free API key from https://www.themoviedb.org/settings/api
    2. Set it as an environment variable before running:

        # macOS / Linux
        export TMDB_API_KEY="your_api_key_here"

        # Windows (PowerShell)
        $env:TMDB_API_KEY="your_api_key_here"

    3. Run the script:
        python movie_chatbot.py
"""

import os
import random
import requests

TMDB_API_KEY = os.environ.get("TMDB_API_KEY")
TMDB_BASE = "https://api.themoviedb.org/3"


def search_movie(query):
    """Find a movie by name using TMDB search."""
    url = f"{TMDB_BASE}/search/movie"
    params = {"api_key": TMDB_API_KEY, "query": query}
    resp = requests.get(url, params=params).json()
    results = resp.get("results", [])
    return results[0] if results else None


def get_recommendations(movie_id, n=5):
    """Use TMDB's own recommendation engine."""
    url = f"{TMDB_BASE}/movie/{movie_id}/recommendations"
    params = {"api_key": TMDB_API_KEY}
    resp = requests.get(url, params=params).json()
    results = resp.get("results", [])[:n]
    return [m["title"] for m in results]


def parse_input(user_input):
    """Search TMDB directly instead of scanning a local dataframe."""
    if not TMDB_API_KEY:
        print("⚠️  Please set your TMDB_API_KEY environment variable first.")
        return None
    return search_movie(user_input)


def chatbot():
    greetings = [
        "Hello! I'm your movie buddy.",
        "Hi there! Ready to discover some movies?",
        "Hey! Let's find you a movie to watch.",
    ]
    print(random.choice(greetings))

    user_input = input("\nYou: ").strip()

    movie = parse_input(user_input)
    if movie:
        title = movie["title"]
        recommendations = get_recommendations(movie["id"])
        if recommendations:
            print(f"\nBecause you mentioned '{title}', you might also enjoy:")
            for rec in recommendations:
                print("- " + rec)
        else:
            print("Hmm... TMDB doesn't have recommendations for that one.")
    else:
        print("I couldn't find that movie on TMDB. Try a different title!\n")


if __name__ == "__main__":
    chatbot()
