import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'T_USER'})
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'name'})
    name: number;

    @Column({name: 'login'})
    username: string;

    @Column({name: 'hash'})
    hash: string;
}