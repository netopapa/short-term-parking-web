import { BaseModel } from './base.model';
import { StationSimple } from './station-simple.model';

export class EmployeeSimple extends BaseModel {
    name: string;
    status: boolean;
    code: string;
    date_admition: Date;
    sector_name: string;
    sector_id: string;
    station: StationSimple;
    // station_name: string;
    // station_id: string;
}
