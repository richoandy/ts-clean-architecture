import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { INote } from 'domain/note/entity';

@Entity({ name: 'notes' })
export default class Note extends BaseEntity implements INote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}
