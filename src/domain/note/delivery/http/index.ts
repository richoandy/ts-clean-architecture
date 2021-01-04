import * as express from 'express';
import { INoteUsecase } from '../../entity';

export default class NoteHttpDelivery {
    private app: express.Express;
    private noteUsecase: INoteUsecase;

    constructor (app: express.Express, noteUsecase: INoteUsecase) {
        this.app = app;
        this.noteUsecase = noteUsecase;
    }

    loadHttpDelivery (): void {
        this.app.post('/note', async (req, res) => {
            res.json(await this.noteUsecase.create(req.body));
        });
    }
}
