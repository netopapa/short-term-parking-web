import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StationSimple } from 'app/model/station-simple.model';
import { StationSimpleService } from 'app/service/station-simple/station-simple.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { StationFormComponent } from '../station-form/station-form.component';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent extends GenericListComponent<StationSimple, StationSimpleService> {

  @ViewChild('stationModal') stationModal: StationFormComponent;

  constructor(
    translate: TranslationService,
    service: StationSimpleService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(station?: StationSimple): void {
    this.stationModal.initModal(station);
  }

}
