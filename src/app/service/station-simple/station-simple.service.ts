import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { StationSimple } from 'app/model/station-simple.model';
import { Station } from 'app/model/station.model';
import { Observable } from 'rxjs';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class StationSimpleService extends CrudService<StationSimple> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.STATION, errorHandler, translate, activatedRoute);
  }
}
