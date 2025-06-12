const searchInput = document.getElementById('search-input');
const output = document.getElementById('output'); 

async function fetchWeather() {
  try {
    const query = searchInput.value.trim();
    const response = await fetch(`/.netlify/functions/weather?q=${encodeURIComponent(query)}`);
    const data = await response.json();
   
    if (data.error) {
      throw new Error(data.error.message);
    }

    console.log(data); // for debugging

    const planetData = determineStarWarsPlanet(data);
    output.innerHTML = `<p>🌍 Location: ${planetData.earthLocation} </p> 
    <p>🪐 is currently like being on <strong>${planetData.starWarsPlanet}</strong></p> 
    <p>🌡️ Temperature: ${planetData.details.temperature}°C (Feels like: ${planetData.details.feelsLike}°C)</p> 
    <p>💨 Wind: ${planetData.details.wind} kph</p>
    <p>💧 Humidity: ${planetData.details.humidity}%</p>
    <p>⏰ Last Updated: ${planetData.details.lastUpdated}</p>`;

  document.body.style.backgroundImage = `url(./assets/${planetData.starWarsPlanet.toLowerCase()}.jpg)`;

    
  } catch (err) {
    alert('These are not the droids you are looking for... Weather data not found');
    console.error(`Weather data not found: ${err}`);
  }
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
