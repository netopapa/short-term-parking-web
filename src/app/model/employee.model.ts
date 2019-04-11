import { BaseModel } from './base.model';
import { EmployeeType } from './employeeType.enum';
import { MediaFile } from './media-file.model';
import { ProductionLine } from './production-line.model';
import { Sector } from './sector.model';
import { Station } from './station.model';

export class Employee extends BaseModel {
    name: string;
    status: boolean;
    code: string;
    date_admition: Date;
    sector: Sector;
    production_line: ProductionLine;
    station: Station;
    employee_type: EmployeeType;
    photo: MediaFile;

    constructor() {
        super();
        this.sector = new Sector();
        this.production_line = new ProductionLine();
        this.station = new Station();
    }
}
