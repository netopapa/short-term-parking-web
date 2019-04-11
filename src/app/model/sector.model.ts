import { Area } from './area.model';
import { BaseModel } from './base.model';

export class Sector extends BaseModel {
    name: string;
    area: Area;
    code: string;

    constructor() {
        super();
        this.area = new Area();
    }
}
