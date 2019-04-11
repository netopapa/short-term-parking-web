import { BaseModel } from './base.model';
import { DeviceType } from './deviceType.enum';
import { Area } from './area.model';
import { ConnectionStatus } from 'app/constant/connection-status';

export class Camera extends BaseModel {
    model: string;
    name: string;
    description: string;
    deviceType: DeviceType;
    area: Area;
    netStat: ConnectionStatus;

    constructor() {
        super();
        this.area = new Area();
    }
}
