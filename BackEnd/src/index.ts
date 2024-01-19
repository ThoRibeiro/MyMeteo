import "reflect-metadata";

import { DataSource } from "typeorm";
import express from "express";

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

async function main() {
  const server = express();
  await dataSource.initialize();
  console.log("BDD start : OK !");

  server.get("/weather", async (request, response) => {
    const weather = new Weather(request.query.city as string);
    const data = await weather.setCurrent();
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
    const data = await searchCity.setCity()

    return response.json(data);
  });

  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

main();