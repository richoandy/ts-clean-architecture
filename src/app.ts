import 'reflect-metadata'; // dependency for typeORM

import * as express from 'express';
import TypeormConnector from './util/typeorm_connector';
import { IHttpDelivery } from './util/delivery/http';

// Note Domain
import { INote, INoteUsecase, INoteRepo } from './domain/note/entity';
import NoteRepo from './domain/note/repository';
import NoteUsecase from './domain/note/usecase';
import NoteHttpDelivery from './domain/note/delivery/http';

// load env
const HOST = 'localhost';
const DATABASE = 'ts-clean-architecture';
const USERNAME = 'root';
const PASSWORD = '';
const DATABASE_PORT = 3306;
const PORT = 3000;

// initialize typeORM connection to mysql database
const connection = new TypeormConnector({
    host: HOST,
    port: DATABASE_PORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
});

(async () => {
    await connection.initConnection();
})();

// prepare express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load delivery (HTTP) for Note
const noteRepo = new NoteRepo();
const noteUsecase = new NoteUsecase(noteRepo);
const noteHttpDelivery = new NoteHttpDelivery(app, noteUsecase);
noteHttpDelivery.loadHttpDelivery();

// start express server
app.listen(PORT);
