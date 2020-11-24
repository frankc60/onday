declare module 'onday' {
  export default class onday {
    constructor(day?: number, month?: number);

    doy(day?: number, month?: number): Promise<{
      today: Date;
      result: number;
    }>;

    workoutdate(day?: number, month?: number): Promise<string>;

    check(day?: number, month?: number): Promise<string>;
  }
}
