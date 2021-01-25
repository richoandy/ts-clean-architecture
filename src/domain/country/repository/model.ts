import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ICountry } from 'domain/country/entity';

@Entity({ name: 'countries' })
export default class Country extends BaseEntity implements ICountry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capital_city: string;
}
