/**
 * ORM: TypeORM
 * docs: https://github.com/typeorm/typeorm
 */

import { createConnection, Connection } from 'typeorm';

type dbConfigType = {
    host: string,
    port: number,
    database: string,
    username: string,
    password: string,
};

export default class TypeormLoader {
    private dbConfig: dbConfigType;

    constructor (dbConfig: dbConfigType) {
        this.dbConfig = dbConfig;
    }

    async initConnection (): Promise<Connection>  {
        return await createConnection({
            type: 'mysql',
            entities: [
                `./src/domain/**/repository/*.model.ts`,
            ],
            ...this.dbConfig,
        });
    }
}
