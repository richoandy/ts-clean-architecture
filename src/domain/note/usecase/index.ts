import { QueryRunner } from 'typeorm';
import { ITransactionManager } from 'util/transaction_manager/interface';
import { INote, INoteUsecase, INoteRepo } from '../entity';

export default class NoteUsecase implements INoteUsecase {
    private noteRepo: INoteRepo;
    private transactionManager: ITransactionManager<any>;

    constructor (transactionManager: ITransactionManager<any>, noteRepo: INoteRepo) {
        this.transactionManager = transactionManager;
        this.noteRepo = noteRepo;
    }

    async create (note: INote): Promise<INote> {
        const trx = await this.transactionManager.start();

        try {
            const result = await this.noteRepo.create(trx, note);

            await this.transactionManager.commit(trx);
            return result;
        } catch (error) {
            await this.transactionManager.rollback(trx);
            throw error;
        }
    }
}
