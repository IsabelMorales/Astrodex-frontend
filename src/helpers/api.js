import * as opencage from "opencage-api-client";
import { keys } from "./keys";

export const geoUbicacion = async (city, state, country) => {
  try {
    const response = await opencage.geocode({
      q: city + "," + state + "," + country,
      key: keys.apiKey,
    });
    console.log(response);
    const ubicacion = response.results[0].geometry;
    return ubicacion;
  } catch (error) {
    console.log(error);
  }
};
