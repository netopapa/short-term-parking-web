import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaSimple } from 'app/model/area-simple.model';
import { Area } from 'app/model/area.model';
import { Unit } from 'app/model/unit.model';
import { AreaService } from 'app/service/area/area.service';
import { UnitService } from 'app/service/unit/unit.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare const $: any;

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent extends GenericFormComponent<Area, AreaService> implements AfterViewInit {
  @ViewChild('areaForm') areaForm: NgForm;

  unities: Unit[] = [];
  areas: Area[] = [];

  constructor(
    private unitService: UnitService,
    service: AreaService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Area);
  }

  ngAfterViewInit(): void {
    $('#areaModal').on('hide.bs.modal', () => {
      this.clearForm(this.areaForm);
    });
  }

  public initModal(area?: AreaSimple): void {
    if (area) {
      Object.assign(this.obj, area);
      this.obj.unit.id = area.unit_id;
      this.edit = true;
    } else {
      this.obj = new Area();
      this.edit = false;
    }
    this.getUnites();
    this.getAreas();
    $('#areaModal').modal('show');
  }

  closeModal(): void {
    $('#areaModal').modal('hide');
  }

  getAreas(): void {
    this.service.getAll().subscribe(
      success => {
        this.areas = success;
      }
    );
  }

  getUnites() {
    this.unities = [];
    this.unitService.getAll().subscribe(
      success => {
        this.unities = success;
      }
    );
  }

  alreadyAssociated(unitId: string): boolean {
    return this.areas.find(area => area.unit.id === unitId &&
      this.obj.name === area.name &&
      area.id !== this.obj.id) ? true : false;
  }

  getHolderUnit(): string {
    if (this.unities.length < 1) {
      return 'Não há unidades cadastradas';
    } else {
      return 'Unidades';
    }
  }
}
