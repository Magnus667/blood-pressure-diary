import { Medication } from '@blood-pressure-diary/api-interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { MedicineEntity } from './medicine.entity';

@Entity({ name: 'T_MEDICATION' })
export class MedicationEntity implements Medication {
  @PrimaryGeneratedColumn({ name: 'id' })
  Id: number;

  @Column({ name: 'userId' })
  UserId: number;

  @Column({ name: 'medicineId' })
  MedicineId: number;

  @Column({ name: 'dosage' })
  Dosage: number;

  @Column({ name: 'timestamp', type: 'timestamptz' })
  Timestamp: Date;

  @OneToOne(() => MedicineEntity)
  @JoinColumn()
  medicine: MedicineEntity;
}
