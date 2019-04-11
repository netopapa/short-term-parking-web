import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorSimple } from 'app/model/sector-simple.model';
import { SectorSimpleService } from 'app/service/sector-simple/sector-simple.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { SectorFormComponent } from '../sector-form/sector-form.component';


@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss']
})
export class SectorListComponent extends GenericListComponent<SectorSimple, SectorSimpleService> {

  @ViewChild('sectorModal') sectorModal: SectorFormComponent;

  constructor(
    translate: TranslationService,
    service: SectorSimpleService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(unit?: SectorSimple): void {
    this.sectorModal.initModal(unit);
  }
}
