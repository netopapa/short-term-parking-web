import { Injectable } from '@angular/core';
import { Employee } from 'app/model/employee.model';
import { CrudService } from '../generic-crud/generic-crud.service';
import { Http } from '@angular/http';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { Constant } from 'app/constant/constant';

@Injectable()
export class EmployeeService extends CrudService<Employee> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.EMPLOYEE, errorHandler, translate, activatedRoute);
  }
}
