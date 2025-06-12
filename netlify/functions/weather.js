const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q;
  const API_KEY = process.env.WEATHER_API_KEY;

  console.log(`Incoming weather request for: ${query}`);

  if (!query) {
    console.error("No query parameter provided.");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No query provided" }),
    };
  }

  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    const data = await weatherResponse.json();

    // Log relevant data to console for debugging
    console.log("Weather API response:");
    console.log(JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Weather API fetch failed:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Weather data fetch failed" }),
    };
  }
};
