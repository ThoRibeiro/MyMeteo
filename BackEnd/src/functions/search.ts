export class Search {
  city: string;

  /**
   * Constructeur de Search à partir du nom d'une ville.
   *
   * @param {string} city - Le nom de la ville à instancier.
   */
  constructor(city: string) {
    this.city = city;
  }

  /**
   * Initialise la search en appelant l'API geoCodeMaps. Permet aussi d'avoir la latitude et longitude d'une Ville.
   */
  async setCity(): Promise<SearchCity | undefined> {
    if (!this.city) {
      throw new Error(`Ville non trouvées pour la recherche: ${this.city}`);
    }

    try {
      const searchResponse = await fetch(
        `https://geocode.maps.co/search?q=${this.city}&api_key=65a4fed00e84b807084661tisfc7f77`
      );

      if (!searchResponse.ok) {
        throw new Error(
          `Erreur HTTP: ${searchResponse.status} - ${searchResponse.statusText}`
        );
      }

      const search = await searchResponse.json();

      const firstResult: SearchCity = search[0];
      return firstResult;
    } catch (error) {
      console.error(
        "Erreur lors de la recherche:",
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  }
  async setLatitudeAndLongitude(city : string) : Promise<Coordinates> {
    if (!this.city) {
      throw new Error(`City not preset`);
    }
    try {
      const searchResponse = await fetch(
          `https://geocode.maps.co/search?q=${this.city}&api_key=65a4fed00e84b807084661tisfc7f77`
      );
      if (!searchResponse.ok) {
        throw new Error(
            `Erreur HTTP: ${searchResponse.status} - ${searchResponse.statusText}`
        );
      }

      const search = await searchResponse.json();
      const firstResult: SearchCity = search[0];

      const { lat, lon} = firstResult;
      return { lat, lon };
    } catch (error) {
      console.error(
          "Error in search for latitude and longitude :",
          error instanceof Error ? error.message : "Don't know Error"
      );

      throw new Error("Error in search for latitude and longitude");
    }
    }
}
