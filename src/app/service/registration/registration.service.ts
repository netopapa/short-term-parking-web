import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { Registration } from 'app/model/registration.model';
import { Observable } from 'rxjs/Observable';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';

@Injectable()
export class RegistrationService extends CrudService<Registration> {

  constructor(http: Http,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.REGISTRATION, errorHandler, activatedRoute);
  }

  public findAllInside(): Observable<Registration[]> {
    return this.get(this.baseURL + 'inside');
  }

}
