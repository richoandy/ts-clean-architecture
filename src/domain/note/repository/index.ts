import { QueryRunner } from 'typeorm';
import { INoteRepo, INote } from '../entity';
import Note from './model';

export default class NoteRepo implements INoteRepo {
    async create (trx: QueryRunner, payload: INote): Promise<INote> {
        const note = new Note();
        note.title = payload.title;
        note.description = payload.description;

        return trx.manager.save(note);
    }
}
