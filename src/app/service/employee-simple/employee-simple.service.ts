import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { EmployeeSimple } from 'app/model/employee-simple.model';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class EmployeeSimpleService extends CrudService<EmployeeSimple> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.EMPLOYEE, errorHandler, translate, activatedRoute);
  }
}
