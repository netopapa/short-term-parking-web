import { BaseModel } from './base.model';
import { Area } from './area.model';
import { ConnectionStatus } from 'app/constant/connection-status';

export class Gate extends BaseModel {
    gmodel: string;
    code: string;
    address: string;
    description: string;
    area: Area;
    netStat: ConnectionStatus;

    constructor() {
        super();
        this.area = new Area();
    }
}
