import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Borrower } from "./Borrower";
import { Book } from "./Book";

@Entity('borrowed')
export class Borrowed {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    borrower_id: number;

    @Column({type: 'int'})
    book_id: number;

    @Column({type: 'timestamp'})
    booked_date: Date;

    @ManyToOne(() => Borrower, (borrower) => borrower.borrowedBooks)
    @JoinColumn({ name: 'borrower_id' })
    borrower: Borrower;

    @ManyToOne(() => Book, (book) => book.borrowedBy)
    @JoinColumn({ name: 'book_id' })
    book: Book;
}