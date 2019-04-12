import { Injectable } from '@angular/core';
import { PriceTable, Shifts } from 'app/constant/price-table';

@Injectable()
export class ParkingService {

  constructor() { }

  generateValue(isHolyday = false): number {
    const dateNow: Date = new Date();
    const weekDay: number = dateNow.getDay();
    const shift: Shifts = this.getShift();

    if (isHolyday || weekDay === 0 || weekDay === 6) {
      return PriceTable.WEEKWND_AND_HOLYDAYS;
    } else if (shift === Shifts.MORNING) {
      return PriceTable.MORNING;
    } else {
      return PriceTable.EVENING;
    }
  }

  public getShift(): Shifts {
    const hours: number = new Date().getHours();

    if (hours > 7 && hours < 12) {
      return Shifts.MORNING;
    } else if (hours >= 12 && hours < 18) {
      return Shifts.EVENING;
    } else {
      return Shifts.NIGHT;
    }

  }

}
