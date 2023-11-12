import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('borrowers')
export class Borrower {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'nvarchar'})
    name: string;

    @Column({type: 'nvarchar'})
    email: string;

    @Column({type: 'timestamp'})
    registered_date: Date;
}