import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';
import { Unit } from 'app/model/unit.model';
import { UnitService } from 'app/service/unit/unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent extends GenericFormComponent<Unit, UnitService> implements AfterViewInit {
  @ViewChild('unitForm') unitForm: NgForm;
  units: Unit[] = [];

  constructor(
    service: UnitService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Unit);
  }

  ngAfterViewInit(): void {
    $('#unitModal').on('hide.bs.modal', () => {
      this.clearForm(this.unitForm);
    });
  }

  getUnits(): void {
    this.service.getAll().subscribe(
      success => {
        this.units = success;
      }
    );
  }

  public initModal(unit?: Unit): void {
    if (unit) {
      Object.assign(this.obj, unit);
      this.edit = true;
    } else {
      this.obj = new Unit();
      this.edit = false;
    }
    this.getUnits();
    $('#unitModal').modal('show');
  }

  closeModal(): void {
    $('#unitModal').modal('hide');
  }

}
