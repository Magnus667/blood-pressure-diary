export class BloodPressureDateCreaeDto {
    constructor(
        public Systolic: number,
        public Diastolic: number,
        public Pulse: number,
        public Date: Date
    ){}
}