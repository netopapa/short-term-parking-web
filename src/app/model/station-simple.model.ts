import { BaseModel } from './base.model';

export class StationSimple extends BaseModel {
    name: string;
    code: string;
    line_name: string;
    line_id: string;
}
