<<<<<<< HEAD
// netlify/functions/weather.js

const fetch = require('node-fetch'); // required for Netlify Node environment

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No query provided" }),
    };
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Weather data fetch failed" }),
    };
  }
};