const axios = require("axios");

async function geoCode(country, estate, city) {

  let apiKey = "37222f6656c044859905d898d1e7583a";
  let api_url = "https://api.opencagedata.com/geocode/v1/json";

  const requestUrl = `${api_url}?key=${apiKey}&q=${encodeURIComponent(
    `${city},${estate},${country}`
  )}&pretty=1&no_annotations=1`;
  
  try {
    const response = await axios.get(requestUrl);
    const data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  
}



exports.geoCode = geoCode;
