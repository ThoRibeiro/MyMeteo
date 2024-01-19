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


   async createNew(name: string, latitude: number, longitude: number) {
    const place = new Place();
    place.name = name;
    place.latitude = latitude;
    place.longitude = longitude;

    await place.save();
    await place.reload();
    return place;
  }
}
