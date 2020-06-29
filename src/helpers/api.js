import * as opencage from "opencage-api-client";
import { keys } from "./keys";
const requests = require ("requests");
const axios = require("axios");

export const geoUbicacion = async (city, state, country) => {
  try {
    const response = await opencage.geocode({
      q: city + "," + state + "," + country,
      key: keys.apiKey,
    });
    //console.log(response);
    const ubicacion = response.results[0].geometry;
    return ubicacion;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const planetas = async()=>{
  try{
    const res = await axios.get("http://www.owghat.com/Planets.ashx?year=2019&month=6&day=19&hour=3&minute=12&latitude=30&longitude=0")
    let data = res.data;
    //console.log(data)
    return data
  } catch(error){
    //console.log(error)
    return error
  }
   
}
