export type Where<T> = {
    [Property in keyof Partial<T>]: string | number | Date;
}
