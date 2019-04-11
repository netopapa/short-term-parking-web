import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'app/model/area.model';
import { Employee } from 'app/model/employee.model';
import { ProductionLine } from 'app/model/production-line.model';
import { Sector } from 'app/model/sector.model';
import { Station } from 'app/model/station.model';
import { AreaService } from 'app/service/area/area.service';
import { EmployeeService } from 'app/service/employee/employee.service';
import { ProductionLineService } from 'app/service/productionLine/production-line.service';
import { SectorService } from 'app/service/sector/sector.service';
import { StationService } from 'app/service/station/station.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends GenericFormComponent<Employee, EmployeeService> implements OnInit {

  @ViewChild('employeeForm') employeeForm: NgForm;

  today: Date = new Date();

  areas: Area[] = [];
  sectors: Sector[] = [];
  lines: ProductionLine[] = [];
  stations: Station[] = [];

  selectedAreaId: string;


  constructor(
    private areaService: AreaService,
    private sectorService: SectorService,
    private lineService: ProductionLineService,
    private stationService: StationService,
    service: EmployeeService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location,
    cd: ChangeDetectorRef
  ) {
    super(router, activatedRoute, service, location, Employee, cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.edit) {
      this.getAreas();
    }
  }

  beforeSave() {
    if (!this.obj.station.id || !this.obj.production_line.id) {
      this.obj.station = new Station();
    }

    if (!this.obj.production_line.id) {
      this.obj.production_line = new ProductionLine();
    }
  }

  clearForm(idForm: NgForm) {
    super.clearForm(idForm);
    this.selectedAreaId = '';
  }

  afterLoadObj() {
    this.getAreas();
    this.obj.date_admition = new Date(this.obj.date_admition);
    if (!this.obj.station) {
      this.obj.station = new Station();
    }
    if (!this.obj.production_line) {
      this.obj.production_line = new ProductionLine();
    }
  }

  getPlaceholder(list: any[], entityName: string): string {
    return list.length < 1 ? 'Lista vazia' : `Selecione ${entityName}`;
  }

  getAreas(): void {
    this.areaService.getAll().subscribe(
      success => {
        this.areas = success;
        this.getSectors();
      }
    );
  }

  getSectors(): void {
    this.sectorService.getAll().subscribe(
      success => {
        this.sectors = success;
        this.getLines();
      }
    );
  }

  getLines(): void {
    this.lineService.getAll().subscribe(
      success => {
        this.lines = success;
        this.getStations();
      }
    );
  }

  getStations(): void {
    this.stationService.getAll().subscribe(
      success => {
        this.stations = success;
        if (this.edit) {
          this.afterLoadAllSelects();
        }
      }
    );
  }

  afterLoadAllSelects(): void {
    this.selectedAreaId = this.obj.sector.area.id;
  }

  verify() {
    return !this.obj.date_admition ? false : true;
  }

}

