import * as express from 'express';
import { ITransactionManager } from '../../../../util/transaction_manager/interface';
import { INoteUsecase } from '../../entity';

export default class NoteHttpDelivery {
    private app: express.Express;
    private noteUsecase: INoteUsecase;

    constructor (app: express.Express, noteUsecase: INoteUsecase) {
        this.app = app;
        this.noteUsecase = noteUsecase;
    }

    async loadHttpDelivery (): Promise<void> {
        this.app.post('/note', async (req, res) => {
            res.json(await this.noteUsecase.create(req.body));
        });
    }
}
