import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionLine } from 'app/model/production-line.model';
import { StationSimple } from 'app/model/station-simple.model';
import { Station } from 'app/model/station.model';
import { ProductionLineService } from 'app/service/productionLine/production-line.service';
import { StationService } from 'app/service/station/station.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss']
})
export class StationFormComponent extends GenericFormComponent<Station, StationService> implements AfterViewInit {

  @ViewChild('stationForm') stationForm: NgForm;

  lines: ProductionLine[] = [];
  stations: Station[] = [];

  constructor(
    private productionLineService: ProductionLineService,
    service: StationService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Station);
  }

  ngAfterViewInit(): void {
    $('#sectorModal').on('hide.bs.modal', () => {
      this.clearForm(this.stationForm);
    });
  }

  clearForm(idForm: NgForm) {
    super.clearForm(idForm);
  }

  public initModal(station?: StationSimple): void {
    if (station) {
      Object.assign(this.obj, station);
      this.obj.production_line.id = station.line_id;
      this.edit = true;
    } else {
      this.obj = new Station();
      this.edit = false;
    }
    this.getAllLines();
    this.getStations();
    $('#stationModal').modal('show');
  }

  closeModal(): void {
    $('#stationModal').modal('hide');
  }

  getAllLines(): void {
    this.productionLineService.getAll().subscribe(
      success => {
        this.lines = success;
      }
    );
  }

  getStations(): void {
    this.service.getAll().subscribe(
      success => {
        this.stations = success;
      }
    );
  }

  alreadyAssociated(lineId: string): boolean {
    return this.stations.find(station => station.production_line.id === lineId &&
      this.obj.name === station.name &&
      station.id !== this.obj.id) ? true : false;
  }

}
