import { Medicine } from '@blood-pressure-diary/api-interfaces';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'T_MEDICINE' })
export class MedicineEntity implements Medicine {
  @PrimaryColumn({ name: 'id' })
  Id: number;

  @Column({ name: 'name' })
  Name: string;
}
