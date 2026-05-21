const OPENWEATHER_API_KEY = "";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const messageEl = document.getElementById("message");
const resultSection = document.getElementById("weather-result");
const locationEl = document.getElementById("location");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

function showMessage(text, type = "info") {
  messageEl.textContent = text;
  messageEl.className = type === "error" ? "message error" : "message";
}

function showResult() {
  resultSection.classList.remove("hidden");
}

function hideResult() {
  resultSection.classList.add("hidden");
}

function buildQuery(city, country) {
  const normalizedCity = city.trim();
  const normalizedCountry = country.trim();
  if (!normalizedCity) {
    return "";
  }

  return normalizedCountry
    ? `${normalizedCity},${normalizedCountry}`
    : normalizedCity;
}

function formatWind(speed) {
  return `${speed.toFixed(1)} m/s`;
}

function updateWeather(data) {
  const weather = data.weather && data.weather[0];
  const iconCode = weather && weather.icon;
  const description = weather && weather.main;

  locationEl.textContent = `${data.name}, ${data.sys?.country || ""}`;
  descriptionEl.textContent = description || "Weather";
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = formatWind(data.wind.speed);

  if (iconCode) {
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = weather.description || "Weather icon";
  } else {
    iconEl.src = "";
    iconEl.alt = "";
  }

  showResult();
}

async function fetchWeather(query) {
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${endpoint}?q=${encodeURIComponent(query)}&units=metric&appid=${OPENWEATHER_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.message || "Unable to load weather data.";
    throw new Error(message);
  }

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;
  const country = countryInput.value;
  const query = buildQuery(city, country);

  hideResult();

  if (!query) {
    showMessage("Please enter a city and country before searching.", "error");
    return;
  }

  if (!OPENWEATHER_API_KEY) {
    showMessage(
      "Add your OpenWeatherMap API key to script.js before using WEATHERLY.",
      "error"
    );
    return;
  }

  showMessage("Loading weather…");

  try {
    const weatherData = await fetchWeather(query);
    updateWeather(weatherData);
    showMessage("");
  } catch (error) {
    showMessage(error.message || "Network error occurred.", "error");
  }
});
