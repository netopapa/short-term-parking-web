import { BaseModel } from './base.model';
import { Car } from './car.model';

export class Registration extends BaseModel {
    car: Car;
    checkin: string;
    checkout: string;
    value: number;

    constructor() {
        super();
        this.car = new Car();
        this.checkin = new Date().toTimeString().slice(0, 5);
    }
}
