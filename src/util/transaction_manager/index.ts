/**
 * ORM: TypeORM
 * docs: https://github.com/typeorm/typeorm
 */

import { getConnection, QueryRunner } from 'typeorm';
import { Query } from 'typeorm/driver/Query';

 export default class TransactionManager {
     static async start (): Promise<QueryRunner> {
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.startTransaction();
        return queryRunner;
     }

     static async commit (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.commitTransaction();
        await queryRunner.release();
     }

     static async rollback (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
     }
 }
