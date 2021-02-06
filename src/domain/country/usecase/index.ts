import { count } from 'console';
import { ICacheManager } from 'util/cache_manager/interface';
import { ITransactionManager } from 'util/transaction_manager/interface';
import { ICountry, ICountryUsecase, ICountryRepo, CONSTANT } from '../entity';

export default class CountryUsecase implements ICountryUsecase {
    private countryRepo: ICountryRepo;
    private transactionManager: ITransactionManager<any>;
    private cacheManager: ICacheManager<any>;

    constructor (
        countryRepo: ICountryRepo,
        transactionManager: ITransactionManager<any>,
        cacheManager: ICacheManager<any>) {
        this.countryRepo = countryRepo;
        this.transactionManager = transactionManager;
        this.cacheManager = cacheManager;
    }

    async create (country: ICountry): Promise<ICountry> {
        const trx = await this.transactionManager.start();

        try {
            const result = await this.countryRepo.create(trx, country);

            await this.cacheManager.targetFlush(CONSTANT.COUNTRY);
            await this.transactionManager.commit(trx);
            return result;
        } catch (error) {
            await this.transactionManager.rollback(trx);
            throw error;
        }
    }

    async list (): Promise<ICountry[]> {
        const trx = await this.transactionManager.start();

        const cacheKey = `${CONSTANT.COUNTRY}+${this.list.name}`;

        try {
            const result: ICountry[] = await this.cacheManager.inspect <ICountry[]>(
                cacheKey,
                this.countryRepo.list(trx),
            );

            return result;
        } catch (error) {
            await this.transactionManager.rollback(trx);
            throw error;
        }
    }
}
