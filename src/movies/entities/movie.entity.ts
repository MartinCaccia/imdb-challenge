import { Actor } from "../../common/entities/actor.entity";
import { Director } from "../../common/entities/director.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', { unique: true})
    title: string;

    @Column('numeric', { array: true })
    genre: number[];
    
    @Column('numeric')
    year: number;

    @ManyToOne(() => Director,
    (director) => director.movies,
    {
      nullable: false,
      cascade: false,
      eager: true
    })
    @JoinColumn({ name: 'directorId' })
    director: Director;

    @ManyToMany(() => Actor, (actor) => actor.movies, { eager: true })
    @JoinTable({ name: 'movies_actors'})
    actors: Actor[];

    @Column('text', { default: ''})
    description: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date
}
