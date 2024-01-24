import "reflect-metadata";

import { DataSource } from "typeorm";

import express from "express";
import bodyParser from "body-parser";

import { Weather } from "./functions/weather";
import { Place } from "./Schemas/place";
import { Search } from "./functions/search";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./sqlite.db",
  entities: [Place],
  synchronize: true,
});

const PORT = 3500;

/**
 * Initialise le serveur Express avec les routes nécessaires.
 */
async function main() {
  const server = express();
  await dataSource.initialize();
  console.log("BDD start : OK !");
  server.use(bodyParser.json());

  server.get("/weather", async (request, response) => {
    const weather = new Weather(request.query.city as string);
    const data = await weather.setCurrent();
    console.log(data)
    response.send(data);
  });

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
      const { city, latitude, longitude} = request.body;

      if (!city || !latitude || !longitude) {
        return response.status(400).json({ error: `Missing parameters city :${city}, latitude: ${latitude}, longitude: ${longitude}` });
      }

      const place : Place = new Place();
      await place.createNew(city, latitude, longitude);

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

      if (!cityToDelete) {
        return response.status(400).json({ error: "Missing city parameter" });
      }

      const placeToDelete = await Place.findOne({ where: { city: cityToDelete } });

      if (placeToDelete) {
        await placeToDelete.remove();
        return response.status(204).send();
      } else {
        return response.status(404).json({ error: `City ${cityToDelete} not found` });
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

main();
