import { MessageType } from 'app/service/toast-notification-service/message-type.enum';
import { ToastService } from 'app/service/toast-notification-service/toast-service/toast.service';

export class BaseCommons {

    obj: any;
    edit: boolean;

    constructor() { }

    toast(msg: string, type?: MessageType) {
        ToastService.show(msg, type);
    }
}
