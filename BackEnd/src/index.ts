import "reflect-metadata";

import { DataSource } from "typeorm";

import express from "express";
import bodyParser from "body-parser";

import { Weather } from "./functions/weather";
import { Place } from "./Schemas/place";
import { Search } from "./functions/search";
import { forecastWeatherWithCity } from "./functions/forecastWeather";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./sqlite.db",
  entities: [Place],
  synchronize: true,
})

const PORT = 3500;

/**
 * Initialise le serveur Express avec les routes nécessaires.
 */
async function main() {
  const server = express();
  await dataSource.initialize();
  console.log("BDD start : OK !");
  server.use(bodyParser.json());

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  /**
   * Récupère les données météorologiques en fonction des paramètres de la requête.
   *
   * Si le paramètre de requête 'favorites' est défini sur 'true', retourne la météo actuelle pour les villes favorites.
   * Sinon, retourne la météo actuelle pour la ville spécifiée dans le paramètre de requête 'city'.
   */
   server.get("/weather", async (request, response) => {
    const favorites = request.query.favorites === 'true';

    if (favorites) {
      try {
        const weather = new Weather("");
        const weatherFavorites = await weather.getWeatherFavorites()
        return response.status(200).json(weatherFavorites);
      } catch (error) {
        console.error("Error fetching weather for favorites:", error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      const city = request.query.city as string;

      if (!city) {
        return response.status(400).json({ error: "Missing city parameter" });
      }

      try {
        const weather = new Weather(city);
        const data = await weather.setCurrent(city);
        return response.status(200).json(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  /**
   * Recherche des emplacements en fonction du nom fourni dans la requête.
   */
  server.get("/search/locations", async (request, response) => {
    const query = request.query;
    // console.log(request.query);
    if (!query.name || Array.isArray(query.name)) {
      return response
        .status(400)
        .json({ error: "You must supply query param `name` to search" });
    }
    return response.json();
  });

  /**
   * Obtient les informations météorologiques pour une ville donnée.
   */
  server.get("/search/places", async (request, response) => {
    const query = request.query;
    if (!query.city || Array.isArray(query.city)) {
      return response
        .status(400)
        .json({ error: "You must supply query param `city` to search" });
    }

    const searchCity = new Search(query.city as string);
    const data = await searchCity.setCity();
    return response.json(data);
  });

  /**
   * Crée un nouvel emplacement (favori) en fonction des données fournies dans le corps de la requête.
   */
  server.post("/favorites", async (request, response) => {
    try {
      const { city } = request.body;
      city.toLowerCase()

      const search = new Search(city);
      const coordinates : Coordinates = await search.setLatitudeAndLongitude(city) as Coordinates;
      if (!city || !coordinates) {
        return response.status(400).json({ error: `Missing parameters city: ${city}, latitude: ${coordinates.lat} and longitude: ${coordinates.lon}` });
      }

      const place : Place = new Place();
      await place.createNew(city, coordinates.lat, coordinates.lon);

      return response.status(201).json(place);

    } catch (error) {
      console.error("Error creating favorite:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Supprime un emplacement (favori) en fonction de la ville fournie.
   */
  server.delete("/favorites/:city", async (request, response) => {
    try {
      const cityToDelete = request.params.city;
      let cityDelete = cityToDelete.toLowerCase()

      if (!cityDelete) {
        return response.status(400).json({ error: "Missing city parameter" });
      }

      const placeToDelete = await Place.findOne({ where: { city: cityDelete } });

      if (placeToDelete) {
        await placeToDelete.remove();
        return response.status(204).send();
      } else {
        return response.status(404).json({ error: `City ${cityDelete} not found` });
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Renvoie la météo sur 10 jours en fonction de la ville donnée
   */
  server.get("/forecast/:city", async (request, response) => {
    const city = request.params.city;
    let cityToForecast = city.toLowerCase();

    if (!cityToForecast) {
      return response.status(400).json({ error: "Missing city parameter" });
    }

    try {
      const cityForecast = new forecastWeatherWithCity();
      const weatherForecast = await cityForecast.getForecastWeatherWithCity(cityToForecast);
      return response.status(200).json(weatherForecast);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "City not found in table 'place'") {
          return response.status(404).json({ error: `City ${cityToForecast} not found in favorites` });
        } else {
          return response.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
}

main();
