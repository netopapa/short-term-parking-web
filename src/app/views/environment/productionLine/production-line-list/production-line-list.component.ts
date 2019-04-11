import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionLineSimple } from 'app/model/production-line-simple.model';
import { ProductionLineSimpleService } from 'app/service/productionLine-simple/production-line-simple.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { ProductionLineFormComponent } from '../production-line-form/production-line-form.component';

@Component({
  selector: 'app-production-line-list',
  templateUrl: './production-line-list.component.html',
  styleUrls: ['./production-line-list.component.scss']
})
export class ProductionLineListComponent extends GenericListComponent<ProductionLineSimple, ProductionLineSimpleService> {

  @ViewChild('productionLineForm') productionLineForm: ProductionLineFormComponent;

  constructor(
    translate: TranslationService,
    service: ProductionLineSimpleService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(line?: ProductionLineSimple): void {
    this.productionLineForm.initModal(line);
  }

}
