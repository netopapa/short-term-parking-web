import { BaseModel } from './base.model';
import { Sector } from './sector.model';

export class ProductionLine extends BaseModel {
    name: string;
    code: string;
    sector: Sector;

    constructor() {
        super();
        this.sector = new Sector();
    }
}
