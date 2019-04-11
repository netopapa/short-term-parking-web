import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { AreaSimple } from 'app/model/area-simple.model';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class AreaSimpleService extends CrudService<AreaSimple> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.AREA, errorHandler, translate, activatedRoute);
  }
}
