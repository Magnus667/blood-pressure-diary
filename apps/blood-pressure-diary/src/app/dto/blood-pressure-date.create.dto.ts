export class BloodPressureDateCreateDto {
    constructor(
        public Systolic: number,
        public Diastolic: number,
        public Pulse: number,
        public Date: Date,
        public Id?: number
    ){}
}