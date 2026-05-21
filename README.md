# WEATHERLY

WEATHERLY is a minimalist static weather lookup app built with HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — app markup
- `styles.css` — responsive minimalist styling
- `script.js` — OpenWeatherMap data fetch and UI logic

## Setup

1. Create an OpenWeatherMap API key at https://openweathermap.org/api.
2. Open `script.js` and replace the empty `OPENWEATHER_API_KEY` value with your key:

```js
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";
```

3. Open `index.html` in a browser to use the app locally.

## Usage

- Enter a city and country (free-text or country code).
- Click **Get Weather**.
- The app shows location, temperature, condition, humidity, wind speed, and an icon.

## Deployment to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, enable GitHub Pages and set the publishing source to the `main` branch.
3. Visit the published URL to access WEATHERLY.

## Important note about API keys

GitHub Pages is a static host and cannot securely hide API keys. Keep your key out of the repo by using a restricted free tier key or by replacing the key in `script.js` only after cloning locally. Do not commit your personal API key to source control.
