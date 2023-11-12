import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrowed } from "./Borrowed";
@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'nvarchar'})
    title: string;

    @Column({type: 'nvarchar'})
    author: string;

    @Column({type: 'nvarchar'})
    isbn: string;

    @Column({type: 'int', unsigned: true})
    quantity: number;
    
    @Column({ type: 'nvarchar' })
    shelf_location: string;

    @OneToMany(() => Borrowed, (borrowed) => borrowed.book)
    borrowedBy: Borrowed[];
}