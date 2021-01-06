/**
 * ORM: TypeORM
 * docs: https://github.com/typeorm/typeorm
 */

import { getConnection, QueryRunner } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { ITransactionManager } from './interface';

export default class TransactionManager implements ITransactionManager<QueryRunner> {
    async start (): Promise<QueryRunner> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
    }

    async commit (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.release();
    }

    async rollback (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    }
}
