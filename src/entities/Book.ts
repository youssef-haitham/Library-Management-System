import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}