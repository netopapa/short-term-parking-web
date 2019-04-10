import { BaseModel } from './base.model';
import { WeekDay } from './week-day.enum';

export class Period extends BaseModel {
    day: WeekDay;
    startsAt: string;
    endsAt: string;
    value: number;
}
