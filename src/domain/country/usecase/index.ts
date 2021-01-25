import { count } from 'console';
import { ICacheManager } from 'util/cache_manager/interface';
import { ITransactionManager } from 'util/transaction_manager/interface';
import { ICountry, ICountryUsecase, ICountryRepo } from '../entity';

export default class CountryUsecase implements ICountryUsecase {
    private countryRepo: ICountryRepo;
    private transactionManager: ITransactionManager<any>;

    constructor (
        transactionManager: ITransactionManager<any>,
        cacheManager: ICacheManager<any>,
        countryRepo: ICountryRepo) {
        this.transactionManager = transactionManager;
        this.countryRepo = countryRepo;
    }

    async create (country: ICountry): Promise<ICountry> {
        const trx = await this.transactionManager.start();

        try {
            const result = await this.countryRepo.create(trx, country);

            await this.transactionManager.commit(trx);
            return result;
        } catch (error) {
            console.log(error);
            await this.transactionManager.rollback(trx);
            throw error;
        }
    }
}
