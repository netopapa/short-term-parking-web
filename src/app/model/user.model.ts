import { BaseModel } from './base.model';

export class User extends BaseModel {
    name: string;
    username: string;
    password: string;
}
