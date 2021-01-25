/**
 * ORM: TypeORM
 * docs: https://github.com/typeorm/typeorm
 */

import { Connection, createConnection, getConnection } from 'typeorm';

type dbConfigType = {
    host: string,
    port: number,
    database: string,
    username: string,
    password: string,
};

export default class TypeormConnector {
    private dbConfig: dbConfigType;

    constructor (dbConfig: dbConfigType) {
        this.dbConfig = dbConfig;
    }

    async initConnection (): Promise<void>  {
        await createConnection({
            type: 'mysql',
            entities: [
                `./src/domain/**/repository/model.ts`,
            ],
            ...this.dbConfig,
        });
    }

    async getConnection (): Promise<Connection> {
        return getConnection();
    }
}
