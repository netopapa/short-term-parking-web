import { Injectable, EventEmitter } from '@angular/core';
import { MessageType } from 'app/service/toast-notification-service/message-type.enum';
import { ToastService } from 'app/service/toast-notification-service/toast-service/toast.service';
import { TranslationService } from 'app/service/translation/translation.service';

declare const $: any;

@Injectable()
export class ErrorService {

  private listener: EventEmitter<Error> = new EventEmitter();

  constructor(
    private translate: TranslationService,
  ) { }

  public throwError(error: Error) {
    this.toast(this.translate.translate(error.message), MessageType.ERROR);
  }

  toast(msg: string, type?: MessageType) {
    console.log(msg);
    ToastService.show(this.translate.translate(msg), type);
  }

  public showErrorConvert(errorCustom: any) {
    const origin = this.translate.translate(errorCustom.origin);
    switch (errorCustom.code) {
      case 'E000':
        this.toast(this.translate.translate('Erro interno desconhecido.'), MessageType.ERROR);
        break;
      case 'E001':
        this.toast(this.translate.translate('Erro: ' + origin + ' vinculado(a) à outros itens.'), MessageType.ERROR);
        break;
      case 'E002':
        this.toast(this.translate.translate('Erro: registro já cadastrado.'), MessageType.ERROR);
        break;
      case 'E003':
        this.toast(this.translate.translate('Erro: verifique sua conexão.'), MessageType.ERROR);
        break;
      case 'E004':
        this.toast(this.translate.translate('Erro: ' + origin + ' não encontrado(a)'), MessageType.ERROR);
        break;
      case 'E005':
        this.toast(this.translate.translate('Erro: ' + origin + 'preencha todos os campos obrigatórios*.'), MessageType.ERROR);
        break;
      case 'E006':
        this.toast(this.translate.translate('Erro: ' + origin + 'preencha todos os campos obrigatórios*.'), MessageType.ERROR);
        break;
      default:

    }
  }
}
