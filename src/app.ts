import 'reflect-metadata'; // dependency for typeORM
import * as dotenv from 'dotenv';

import * as express from 'express';
import TypeormConnector from './util/typeorm_connector';

import { IHttpDelivery } from './util/delivery/http';
import TransactionManager from './util/transaction_manager';
import { ITransactionManager } from './util/transaction_manager/interface';

// import config
dotenv.config();
import config from './config';

// Note Domain
import { INote, INoteUsecase, INoteRepo } from './domain/note/entity';
import NoteRepo from './domain/note/repository';
import NoteUsecase from './domain/note/usecase';
import NoteHttpDelivery from './domain/note/delivery/http';

// initialize typeORM connection to mysql database
const connection = new TypeormConnector({
    host: config.HOST,
    port: parseInt(config.DATABASE_PORT, 10),
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
});

(async () => {
    await connection.initConnection();
})();

// prepare TransactionManager for mysql database
const transactionManager = new TransactionManager();

// prepare express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load Note usecase
const noteRepo = new NoteRepo();
const noteUsecase = new NoteUsecase(transactionManager, noteRepo);

// load Note HTTP delivery
const noteHttpDelivery = new NoteHttpDelivery(app, noteUsecase);
noteHttpDelivery.loadHttpDelivery();

// start express server
app.listen(parseInt(config.PORT, 10));
