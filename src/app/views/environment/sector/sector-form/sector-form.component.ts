import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'app/model/area.model';
import { SectorSimple } from 'app/model/sector-simple.model';
import { Sector } from 'app/model/sector.model';
import { AreaService } from 'app/service/area/area.service';
import { SectorService } from 'app/service/sector/sector.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss']
})
export class SectorFormComponent extends GenericFormComponent<Sector, SectorService> implements AfterViewInit {

  @ViewChild('sectorForm') sectorForm: NgForm;

  areas: Area[] = [];
  sectors: Sector[] = [];

  constructor(
    private areaService: AreaService,
    service: SectorService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Sector);
  }

  ngAfterViewInit(): void {
    $('#sectorModal').on('hide.bs.modal', () => {
      this.clearForm(this.sectorForm);
    });
  }

  clearForm(idForm: NgForm) {
    super.clearForm(idForm);
  }

  getSectors(): void {
    this.service.getAll().subscribe(
      success => {
        this.sectors = success;
      }
    );
  }

  public initModal(sector?: SectorSimple): void {
    if (sector) {
      Object.assign(this.obj, sector);
      this.obj.area.id = sector.area_id;
      this.edit = true;
    } else {
      this.obj = new Sector();
      this.edit = false;
    }
    this.getAllAreas();
    this.getSectors();
    $('#sectorModal').modal('show');
  }

  closeModal(): void {
    $('#sectorModal').modal('hide');
  }

  getAllAreas(): void {
    this.areaService.getAll().subscribe(
      success => {
        this.areas = success;
      }
    );
  }

  alreadyAssociated(areaId: string): boolean {
    return this.sectors.find(sector => sector.area.id === areaId &&
      this.obj.name === sector.name &&
      sector.id !== this.obj.id) ? true : false;
  }

}
