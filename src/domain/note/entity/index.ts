import { QueryRunner } from 'typeorm';
import { ITransactionManager } from 'util/transaction_manager/interface';

export interface INote {
    id?: number;
    title: string;
    description: string;
}

export interface INoteRepo {
    create (trx: QueryRunner, note: INote): Promise<INote>;
}

export interface INoteUsecase {
    create (note: INote): Promise<INote>;
}
