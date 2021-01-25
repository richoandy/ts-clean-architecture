import { QueryRunner } from 'typeorm';
import { ITransactionManager } from 'util/transaction_manager/interface';

export interface ICountry {
    id?: number;
    name: string;
    capital_city: string;
}

export interface ICountryRepo {
    create (trx: QueryRunner, country: ICountry): Promise<ICountry>;
}

export interface ICountryUsecase {
    create (country: ICountry): Promise<ICountry>;
}
