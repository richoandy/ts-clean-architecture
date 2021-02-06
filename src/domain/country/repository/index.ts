import { Connection, QueryRunner } from 'typeorm';
import { ICountry, ICountryRepo } from '../entity';
import Country from './model';

export default class CountryRepo implements ICountryRepo {
    private dbConnection: Connection;

    constructor (dbConnection: Connection) {
        this.dbConnection = dbConnection;
    }

    async create (queryRunner: QueryRunner, payload: ICountry): Promise <ICountry> {
        const country = new Country();
        country.name = payload.name;
        country.capital_city = payload.capital_city;

        return queryRunner.manager.save(country);
    }

    async list (queryRunner: QueryRunner): Promise<ICountry[]> {
        return queryRunner.manager.find(Country);
    }
}
