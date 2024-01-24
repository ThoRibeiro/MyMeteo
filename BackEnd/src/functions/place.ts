export class PlaceFav {
    city: string;
    longitude? : number;
    latitude? : number;
  
    /**
     * Constructeur de Place à partir du nom d'une ville, latitude et longitude.
     *
     * @param {string} city - Le nom de la ville à instancier.
     */
    constructor(city: string) {
      this.city = city;
    }
  
    /**
     * Initialise la search en appelant l'API geoCodeMaps.
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
        console.log("Réponse de l'API search :", firstResult);
  
        return firstResult;
      } catch (error) {
        console.error(
          "Erreur lors de la recherche:",
          error instanceof Error ? error.message : "Erreur inconnue"
        );
      }
    }
}
