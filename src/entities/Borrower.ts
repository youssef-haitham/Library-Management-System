import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrowed } from "./Borrowed";

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

    @OneToMany(() => Borrowed, (borrowed) => borrowed.borrower)
    borrowedBooks: Borrowed[];
}