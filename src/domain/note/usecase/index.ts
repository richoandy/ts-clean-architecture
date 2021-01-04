import { INote, INoteUsecase, INoteRepo } from '../entity';
import TransactionManager from '../../../util/transaction_manager';

export default class NoteUsecase implements INoteUsecase {
    private noteRepo;

    constructor (noteRepo: INoteRepo) {
        this.noteRepo = noteRepo;
    }

    async create (note: INote): Promise<INote> {
        const trx = await TransactionManager.start();
        try {
            const result = await this.noteRepo.create(trx, note);
            await TransactionManager.commit(trx);
            return result;
        } catch (error) {
            await TransactionManager.rollback(trx);
            throw error;
        }
    }
}
