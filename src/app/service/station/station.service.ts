import { Injectable } from '@angular/core';
import { CrudService } from '../generic-crud/generic-crud.service';
import { Station } from 'app/model/station.model';
import { Http } from '@angular/http';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { Constant } from 'app/constant/constant';
import { Observable } from 'rxjs';

@Injectable()
export class StationService extends CrudService<Station> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.STATION, errorHandler, translate, activatedRoute);
  }
  public getAllByLine(id: string): Observable<Station[]> {
    return this.get(`${this.baseURL}findByLine/${id}`);
  }
}
