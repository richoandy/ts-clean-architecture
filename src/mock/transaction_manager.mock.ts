import { QueryRunner } from 'typeorm';
import { ITransactionManager } from 'util/transaction_manager/interface';

export default class TransactionManager implements ITransactionManager<object> {
    async start (): Promise<object> {
        return {};
    }

    async commit (queryRunner: object): Promise<void> {}

    async rollback (queryRunner: object): Promise<void> {}
}
