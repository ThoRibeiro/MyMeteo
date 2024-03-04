import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { response } from "express";

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  city?: string;

  @Column({ nullable: true })
  latitude?: number;

  @Column({ nullable: true })
  longitude?: number;

  /**
   * Crée une nouvelle entrée dans la base de données pour une ville si elle n'existe pas déjà.
   *
   * @param {string} city - Le nom de la ville.
   * @param {number} latitude - La latitude de la ville.
   * @param {number} longitude - La longitude de la ville.
   */
  async createNew(
    city: string,
    latitude: number,
    longitude: number
  ): Promise<Place | string> {
    const existingPlace = await Place.findOne({ where: { city } });

    if (existingPlace) {
      return "City found in BDD";
    }

    const newPlace = new Place();
    newPlace.city = city.toLowerCase();
    newPlace.latitude = latitude;
    newPlace.longitude = longitude;

    await newPlace.save();
    await newPlace.reload();
    return newPlace;
  }
}
