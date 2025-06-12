export async function handler(event) {
  const location = encodeURIComponent(event.queryStringParameters.q);
  const apiKey = process.env.WEATHER_API_KEY;

  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
