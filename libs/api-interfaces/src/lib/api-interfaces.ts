export interface Medicine {
  Id: number;
  Name: string;
}

export interface Medication {
  Id: number;
  UserId: number;
  MedicineId: number;
  Dosage: number;
  Timestamp: Date;
}
