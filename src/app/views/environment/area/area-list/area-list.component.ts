import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaSimple } from 'app/model/area-simple.model';
import { AreaSimpleService } from 'app/service/area-simple/area-simple.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { AreaFormComponent } from '../area-form/area-form.component';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent extends GenericListComponent<AreaSimple, AreaSimpleService> {

  @ViewChild('areaModal') areaModal: AreaFormComponent;

  constructor(
    translate: TranslationService,
    service: AreaSimpleService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(area?: AreaSimple): void {
    this.areaModal.initModal(area);
  }

}
