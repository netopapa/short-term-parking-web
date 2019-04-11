import { BaseModel } from './base.model';

export class Unit extends BaseModel {
    name: string;
    code: string;

    constructor() {
        super();
    }
}
