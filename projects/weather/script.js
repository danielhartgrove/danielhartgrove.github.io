const searchInput = document.getElementById('search-input');
const output = document.getElementById('output');
const API_KEY = '9b5684fc48904ad9a88205101251106';

// Line-style icons (stroke = currentColor) to match the app's HUD feel
function svg(paths) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
const ICON = {
  location: svg('<circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z"/>'),
  planet:   svg('<circle cx="12" cy="12" r="4.5"/><ellipse cx="12" cy="12" rx="10" ry="3.2" transform="rotate(-25 12 12)"/>'),
  temp:     svg('<path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z"/>'),
  wind:     svg('<path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/><path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/>'),
  humidity: svg('<path d="M12 2.7s6 5.4 6 9.3a6 6 0 0 1-12 0c0-3.9 6-9.3 6-9.3z"/>'),
  clock:    svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')
};

// Core: fetch + render weather for a given query (place name or "lat,lon")
async function getWeather(query, label) {
  try {
    output.innerHTML = `<p>Searching for weather data${label ? ` near <strong>${label}</strong>` : ''}...</p>`;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    console.log(data); // for debugging

    if (data.error) throw new Error(data.error.message);

    const planetData = determineStarWarsPlanet(data);
    const d = planetData.details;
    output.innerHTML = `
      <div class="readout">
        <div class="ro-row">
          ${ICON.location}
          <span class="ro-label">Location</span>
          <span class="ro-value">${planetData.earthLocation}</span>
        </div>

        <div class="ro-planet">
          ${ICON.planet}
          <span class="ro-planet-sub">Currently like being on</span>
          <span class="ro-planet-name">${planetData.starWarsPlanet}</span>
        </div>

        <div class="ro-row">
          ${ICON.temp}
          <span class="ro-label">Temperature</span>
          <span class="ro-value">${d.temperature}°C <em>feels ${d.feelsLike}°C</em></span>
        </div>
        <div class="ro-row">
          ${ICON.wind}
          <span class="ro-label">Wind</span>
          <span class="ro-value">${d.wind} kph</span>
        </div>
        <div class="ro-row">
          ${ICON.humidity}
          <span class="ro-label">Humidity</span>
          <span class="ro-value">${d.humidity}%</span>
        </div>
        <div class="ro-row">
          ${ICON.clock}
          <span class="ro-label">Updated</span>
          <span class="ro-value">${d.lastUpdated}</span>
        </div>
      </div>`;

    document.body.style.backgroundImage = `url(./assets/${planetData.starWarsPlanet.toLowerCase()}.jpg)`;
  } catch (err) {
    alert('These are not the droids you are looking for... Weather data not found');
    console.error(`Weather data not found: ${err}`);
  }
}

// Manual search from the text input
function fetchWeather() {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a location to search for weather data.');
    return;
  }
  searchInput.value = ''; // Clear the input field after fetching data
  getWeather(query, query);
}

// Search using the device's geolocation
function useMyLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser. Please search manually.');
    return;
  }

  const btn = document.getElementById('locate-button');
  if (btn) btn.classList.add('locating');
  output.innerHTML = `<p>📡 Locating you across the galaxy...</p>`;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (btn) btn.classList.remove('locating');
      const query = `${pos.coords.latitude},${pos.coords.longitude}`;
      getWeather(query, 'your location');
    },
    (err) => {
      if (btn) btn.classList.remove('locating');
      console.error(err);
      if (err.code === err.PERMISSION_DENIED) {
        alert('Location access was denied. Please allow it, or search by name instead.');
        output.innerHTML = `<p>Location access denied — enter a place above instead.</p>`;
      } else {
        alert('Could not determine your location. Please try searching manually.');
        output.innerHTML = `<p>Couldn't find your location — enter a place above instead.</p>`;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function determineStarWarsPlanet(data) {
  const name = data.location.name;
  const country = data.location.country;
  const temp = data.current.temp_c;
  const icon = data.current.condition.text.toLowerCase();
  const wind = data.current.wind_kph;
  const humidity = data.current.humidity;
  const feelsLike = data.current.feelslike_c;
  const lastUpdated = data.current.last_updated;

  let planet = "";

   if (temp > 35 && humidity < 30) {
    planet = "Tatooine";
  } else if (temp < 0 && wind > 20 || (icon.includes("snow"))){
    planet = "Hoth";
  } else if (humidity > 80 && icon.includes("rain")) {
    planet = "Dagobah";
  } else if (temp > 25 && humidity > 70 && icon.includes("sunny")) {
    planet = "Naboo";
  } else if (icon.includes("fog") || icon.includes("rain")) {
    planet = "Kamino";
  } else if (icon.includes("cloudy") || icon.includes("overcast")) {
    planet = "Bespin";
  } else if (temp >= 15 && temp <= 25 && humidity <= 60) {
    planet = "Alderaan";
  } else if (icon.includes("thunderstorm") || icon.includes("lightning")) {
    planet = "Mustafar";
  } else if (icon.includes("clear") || icon.includes("sunny")) {
    planet = "Jakku";
  } else {
    planet = "Coruscant";
  }

  return {
    earthLocation: `${name}, ${country}`,
    starWarsPlanet: planet,
    details: {
      temperature: temp,
      feelsLike: feelsLike,
      wind,
      humidity,
      condition: icon,
      lastUpdated
    }
  };
}

document.getElementById('search-button').addEventListener('click', fetchWeather);
document.getElementById('locate-button').addEventListener('click', useMyLocation);
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});
