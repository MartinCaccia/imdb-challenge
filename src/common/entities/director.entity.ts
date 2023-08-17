import { Movie } from "../../movies/entities/movie.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Director {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @OneToMany(() => Movie, (movie) => movie.director)
    // @JoinColumn()
    movies: Movie[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date
}
