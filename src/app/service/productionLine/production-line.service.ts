import { Injectable } from '@angular/core';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ProductionLine } from 'app/model/production-line.model';
import { Http } from '@angular/http';
import { TranslationService } from '../translation/translation.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { Observable } from 'rxjs';

@Injectable()
export class ProductionLineService extends CrudService<ProductionLine> {

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
