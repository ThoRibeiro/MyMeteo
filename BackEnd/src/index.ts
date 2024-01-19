import "reflect-metadata";

import { DataSource } from "typeorm";
import express from "express";

import { Weather } from "./functions/weather";
import { Place } from "./Schemas/place";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./sqlite.db",
  entities: [Place],
  synchronize: true,
});

const PORT = 3500;

async function main() {
  const server = express();
  await dataSource.initialize();
  console.log("BDD start : OK !");

  server.get("/weather", async (request, response) => {
    const weather = new Weather(request.query.city as string);
    const data = await weather.setCurrent();
    console.log(data);
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

  server.post("/places", async (request, response) => {
    try {
      const query = request.query;
      const searchCity = new Search(query.city as string);
      const newPlace = new Place();
      const data: SearchCity | undefined = await searchCity.setCity();

      if (data === undefined) {
        return response.status(404).json({ error: "City not found" });
      }

      let longitude: number;
      let latitude: number;

      if (data.lon !== undefined && data.lat !== undefined) {
        longitude = data.lon;
        latitude = data.lat;
      } else {
        return response
          .status(404)
          .json({ error: "Longitude or latitude not found in the data" });
      }

      // Utilisez la méthode createNew pour créer une nouvelle entrée en base de données
      const place = await newPlace.createNew(
        searchCity.city,
        latitude,
        longitude
      );

      // Répondez avec les données créées
      return response.status(200).json(place);
    } catch (error) {
      // Gérez les erreurs ici, renvoyez une réponse appropriée
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

main();
