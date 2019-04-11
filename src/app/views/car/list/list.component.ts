import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'app/model/car.model';
import { CarService } from 'app/service/car/car.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends GenericListComponent<Car, CarService> {

  @ViewChild('carForm') carForm: FormComponent;

  constructor(
    service: CarService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(service, router, activedRouter, location);
  }

  showModal(car?: Car): void {
    this.carForm.initModal('#carModal', car);
  }

}
