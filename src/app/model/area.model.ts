import { BaseModel } from './base.model';
import { Unit } from './unit.model';

export class Area extends BaseModel {
    name: string;
    code: string;
    unit: Unit;

    constructor() {
        super();
        this.unit = new Unit();
    }
}
