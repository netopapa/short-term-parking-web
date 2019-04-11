import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { Unit } from 'app/model/unit.model';
import { UnitService } from 'app/service/unit/unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitFormComponent } from '../unit-form/unit-form.component';
import { TranslationService } from 'app/service/translation/translation.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent extends GenericListComponent<Unit, UnitService> {

  @ViewChild('unitModal') unitModal: UnitFormComponent;

  constructor(
    translate: TranslationService,
    service: UnitService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(unit?: Unit): void {
    this.unitModal.initModal(unit);
  }

}
