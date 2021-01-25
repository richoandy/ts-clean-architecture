import { count } from 'console';
import { QueryRunner } from 'typeorm';
import { ICountry, ICountryRepo } from '../entity';
import Country from './model';

export default class CountryRepo implements ICountryRepo {
    async create (trx: QueryRunner, payload: ICountry): Promise <ICountry> {
        const country = new Country();
        country.name = payload.name;
        country.capital_city = payload.capital_city;

        return trx.manager.save(country);
    }
}
