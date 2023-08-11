import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', { unique: true})
    title: string;

    @Column('numeric', { array: true })
    genre: number[];

    @Column('numeric')
    director: number;

    @Column('numeric', { array: true })
    actors: number[];

    @Column('text', { default: ''})
    description: string;
}
