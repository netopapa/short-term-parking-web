import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'app/model/car.model';
import { CarService } from 'app/service/car/car.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends GenericListComponent<Car, CarService> {

  constructor(
    service: CarService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(service, router, activedRouter, location);
  }

}
