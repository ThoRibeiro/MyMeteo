import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    city?: string;

    @Column({nullable: true})
    latitude?: number;

    @Column({nullable: true})
    longitude?: number;

    async createNew(city: string, latitude: number, longitude: number): Promise<Place | null> {
        const existingPlace = await Place.findOne({ where: { city } });

        if (existingPlace) {
            console.log(`The city -> ${city} is found in BDD.`);
            return null;
        }

        const newPlace = new Place();
        newPlace.city = city;
        newPlace.latitude = latitude;
        newPlace.longitude = longitude;

        await newPlace.save();
        await newPlace.reload();
        return newPlace;
    }

    async deletePlace(city: string): Promise<string> {
        const placeToDelete = await Place.findOne({ where: { city } });
        await placeToDelete?.remove();
        return "Place to delete";
    }
}
