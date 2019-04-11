import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { ProductionLineSimple } from 'app/model/production-line-simple.model';
import { ProductionLine } from 'app/model/production-line.model';
import { Observable } from 'rxjs';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class ProductionLineSimpleService extends CrudService<ProductionLineSimple> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.PRODUCTION_LINE, errorHandler, translate, activatedRoute);
  }
  public getAllBySector(id: string): Observable<ProductionLine[]> {
    return this.get(`${this.baseURL}findBySector/${id}`);
  }
}
