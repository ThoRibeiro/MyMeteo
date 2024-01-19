import { Weather } from "./functions/weather";

import express from "express";

const PORT = 3500;
async function main() {
  const server = express();

  server.get("/weather", async (request, response) => {
    const weather = new Weather("Paris");
    await weather.setCurrent();
    return response.json(weather);
  });

  server.post("/favorites", async (request, response) => {
    
  });

  server.get("/", (request, response) => {
    response.send("Hello World !");
  });

  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

main();
