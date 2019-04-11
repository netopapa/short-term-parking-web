import { Injectable } from '@angular/core';
import { Visitor } from 'app/model/visitor.model';
import { CrudService } from '../generic-crud/generic-crud.service';
import { Http } from '@angular/http';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { Constant } from 'app/constant/constant';

@Injectable()
export class VisitorService extends CrudService<Visitor> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.VISITOR, errorHandler, translate, activatedRoute);
  }

}
