import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'T_BLOOD_PRESSURE_DATA'})
export class BloodPressureDataEntity {
    @PrimaryGeneratedColumn({name: 'id'})
    Id: number;

    @Column({name: 'userid'})
    UserId: number;

    @Column({name: 'systolic'})
    Systolic: number;

    @Column({name: 'diastolic'})
    Diastolic: number;

    @Column({name: 'pulse'})
    Pulse: number;

    @Column({ name: 'timestamp', type: 'timestamptz'})
    Date: Date;
}