import * as express from 'express';
import { IHttpDelivery } from 'util/delivery/http/interface';
import { ICountryUsecase } from '../../entity';

export default class CountryHttpDelivery implements IHttpDelivery {
    private app: express.Express;
    private countryUsecase: ICountryUsecase;

    constructor (app: express.Express, countryUsecase: ICountryUsecase) {
        this.app = app;
        this.countryUsecase = countryUsecase;
    }

    async loadHttpDelivery (): Promise<void> {
        this.app.post('/country', async (req, res) => {
            res.json(await this.countryUsecase.create(req.body));
        });

        this.app.get('/country', async (req, res) => {
            res.json(await this.countryUsecase.list());
        });
    }
}
