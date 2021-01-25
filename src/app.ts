import * as express from 'express';
import 'reflect-metadata'; // dependency for typeORM
import { Connection } from 'typeorm';
import { RedisClient } from 'redis';

// Config
import * as dotenv from 'dotenv'; dotenv.config();
import config from './config';

// Connector
import TypeormConnector from './util/typeorm_connector';
import RedisConnector from './util/redis_connector';

// Manager
import TransactionManager from './util/transaction_manager';
import CacheManager from './util/cache_manager';

// Note Domain
import NoteRepo from './domain/note/repository';
import NoteUsecase from './domain/note/usecase';
import NoteHttpDelivery from './domain/note/delivery/http';

// Country Domain
import CountryRepo from './domain/country/repository';
import CountryUsecase from './domain/country/usecase';
import CountryHttpDelivery from './domain/country/delivery/http';

// initialize typeORM connection to mysql database
const typeormConnector = new TypeormConnector({
    host: config.DATABASE.HOST,
    port: parseInt(config.DATABASE.PORT, 10),
    username: config.DATABASE.USERNAME,
    password: config.DATABASE.PASSWORD,
    database: config.DATABASE.NAME,
});

// initialize redis connection for caching
const redisConnector = new RedisConnector({
    host: config.CACHE.HOST,
    port: parseInt(config.CACHE.PORT, 10),
});

// Start Dependencies
let dbConnection: Connection;
let cacheConnection: RedisClient;
(async () => {
    [cacheConnection] = await Promise.all([
        redisConnector.initConnection(),
        typeormConnector.initConnection(),
    ]);

    dbConnection = await typeormConnector.getConnection();
})();

// Prepare Express Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize TransactionManager with Typeorm Implementation
const transactionManager = new TransactionManager(dbConnection);

// initialize CacheManager with Redis Implementation
const cacheManager = new CacheManager(cacheConnection);

// Initialize Note Domain
const noteRepo = new NoteRepo();
const noteUsecase = new NoteUsecase(transactionManager, noteRepo);
const noteHttpDelivery = new NoteHttpDelivery(app, noteUsecase);

// Initialize Country Domain
const countryRepo = new CountryRepo();
const countryUsecase = new CountryUsecase(transactionManager, cacheManager, countryRepo);
const countryHttpDelivery = new CountryHttpDelivery(app, countryUsecase);

// Load Http Deliveries
noteHttpDelivery.loadHttpDelivery();
countryHttpDelivery.loadHttpDelivery();

// Start Express Server
app.listen(parseInt(config.APP.PORT, 10));
