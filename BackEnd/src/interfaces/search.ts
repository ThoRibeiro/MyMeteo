interface SearchCity {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: number;
  lon: number;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}
