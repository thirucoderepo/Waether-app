# WEATHERLY

WEATHERLY is a minimalist static weather lookup app built with HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — app markup
- `styles.css` — responsive minimalist styling
- `script.js` — OpenWeatherMap data fetch and UI logic

## Setup

1. Create an OpenWeatherMap API key at https://openweathermap.org/api.
2. Open `index.html` in a browser to use the app locally.

3. Enter your OpenWeatherMap API key directly in the app UI when prompted.
	- The app includes an "OpenWeatherMap API Key" field in the form.
	- Optionally check **Remember key in this browser** to store the key in your browser's `localStorage` (convenient but less secure).

## Usage

- Enter a city and country (free-text or country code).
- Click **Get Weather**.
- The app shows location, temperature, condition, humidity, wind speed, and an icon.

## Deployment to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, enable GitHub Pages and set the publishing source to the `main` branch.
3. Visit the published URL to access WEATHERLY.

## Important note about API keys

GitHub Pages is a static host and cannot securely hide API keys. Entering the key in the browser is convenient but the key may be visible in the client (and if you choose to remember it, it is stored in the browser). Keep your key out of the repo and use a restricted free-tier key with domain restrictions where possible. Do not commit your personal API key to source control.
