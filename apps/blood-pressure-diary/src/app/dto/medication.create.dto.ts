export class MedicationCreateDto {
  constructor(
    public MedicineId: number,
    public Dosage: number,
    public Timestamp: Date,
    public Id?: number
  ) {}
}
