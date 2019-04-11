import { BaseModel } from './base.model';
import { ProductionLine } from './production-line.model';

export class Station extends BaseModel {
    name: string;
    code: string;
    production_line: ProductionLine;

    constructor() {
        super();
        this.production_line = new ProductionLine();
    }
}
