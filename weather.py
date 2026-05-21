import os
import sys
from typing import Any, Dict

import requests


def get_api_key() -> str:
    """Retrieve the OpenWeatherMap API key from the environment."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing OPENWEATHER_API_KEY environment variable. "
            "Please set it before running the script."
        )
    return api_key


def fetch_weather(api_key: str) -> Dict[str, Any]:
    """Call the OpenWeatherMap API and return the parsed JSON response."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": "Sydney,AU", "appid": api_key, "units": "metric"}

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise ConnectionError("Failed to fetch weather data") from exc

    try:
        return response.json()
    except ValueError as exc:
        raise ValueError("Received invalid JSON from weather service") from exc


def parse_weather(data: Dict[str, Any]) -> Dict[str, str]:
    """Extract temperature and weather conditions from the API response."""
    main = data.get("main")
    weather_list = data.get("weather")

    if not isinstance(main, dict) or not isinstance(weather_list, list):
        raise ValueError("Unexpected API response structure")

    temp = main.get("temp")
    condition = weather_list[0].get("description") if weather_list else None

    if temp is None or condition is None:
        raise ValueError("Missing temperature or weather condition in response")

    return {"temperature": f"{temp:.1f}", "condition": condition.capitalize()}


def display_weather(weather: Dict[str, str]) -> None:
    """Print the current weather in a clean, human-readable format."""
    print("Sydney, Australia - Current Weather")
    print(f"Temperature: {weather['temperature']} °C")
    print(f"Conditions: {weather['condition']}")


def main() -> int:
    """Main entry point for the weather script."""
    try:
        api_key = get_api_key()
        weather_data = fetch_weather(api_key)
        weather = parse_weather(weather_data)
        display_weather(weather)
        return 0
    except EnvironmentError as exc:
        print(f"Error: {exc}", file=sys.stderr)
    except ConnectionError as exc:
        print(f"Network error: {exc}", file=sys.stderr)
    except ValueError as exc:
        print(f"Response error: {exc}", file=sys.stderr)
    except Exception as exc:  # pragma: no cover
        print(f"Unexpected error: {exc}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
