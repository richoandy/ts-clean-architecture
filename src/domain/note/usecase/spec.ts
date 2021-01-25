import { QueryRunner } from 'typeorm';
import { INote, INoteRepo } from '../entity';
import TransactionManager from '../../../mock/transaction_manager.mock';
import NoteUsecase from '.';

const noteRepoMock: INoteRepo = {
    create: async (trx: QueryRunner, note: INote): Promise<INote> => {
        return {
            id: 1,
            title: 'title_test',
            description: 'description_test',
        };
    },
};

const transactionManager = new TransactionManager();
const noteUsecase = new NoteUsecase(transactionManager, noteRepoMock);

describe('Note Usecase', () => {
    test('create usecase', async () => {
        const note: INote = {
            title: 'title_test',
            description: 'description_test',
        };

        const result = await noteUsecase.create(note);
        expect(result.id).toBe(1);
        expect(result.title).toBe('title_test');
        expect(result.description).toBe('description_test');
    });
});
