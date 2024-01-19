import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: true })
  latitude?: number;

  @Column({ nullable: true })
  longitude?: number;

  @Column()
  favorite?: boolean;

  static async createNew(name: string, latitude: number, longitude: number, favorite : boolean) {
    const place = new Place();
    place.name = name;
    place.latitude = latitude;
    place.longitude = longitude;
    place.favorite = favorite;

    await place.save();
    await place.reload();
    return place;
  }
}
