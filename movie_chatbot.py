!pip install requests

import requests
import random

TMDB_API_KEY = "53b6620507a7b71ecbc37dc73259c1cd"

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
    if not TMDB_API_KEY or TMDB_API_KEY.startswith("PASTE"):
        print("⚠️ Please set your TMDB_API_KEY first.")
        return None
    return search_movie(user_input)

def chatbot():
    greetings = ["Hello! I'm your movie buddy.", "Hi there! Ready to discover some movies?", "Hey! Let's find you a movie to watch."]
    # Removed 'bye' list as the chatbot will now exit after one interaction.
    print(random.choice(greetings))

    # Removed the 'while True' loop to make the chatbot run only once.
    user_input = input("\nYou: ").strip()

    # Removed exit conditions as the chatbot will naturally exit after one run.

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
        print("I couldn't find that movie on TMDB. Try a different title!\n") # Added newline for better formatting

chatbot()