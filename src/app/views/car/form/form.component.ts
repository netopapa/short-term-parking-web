import { Location } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'app/model/car.model';
import { CarService } from 'app/service/car/car.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends GenericFormComponent<Car, CarService> implements AfterViewInit {

  cars: Car[] = [];

  constructor(
    service: CarService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location,
  ) {
    super(router, activatedRoute, service, location, Car);
  }

  ngAfterViewInit(): void {
    $('#carModal').on('hide.bs.modal', () => {
      this.obj = new Car();
    });

    $('#carModal').on('show.bs.modal', () => {
      this.getCars();
    });
  }

  getCars() {
    this.service.getAll().subscribe(
      success => {
        this.cars = success;
      }
    );
  }

  plateAlreadyExists(): boolean {
    return this.cars.find(item => item.plate === this.obj.plate && this.obj.id !== item.id) ? true : false;
  }

  setToUpper(): void {
    this.obj.plate = this.obj.plate.toUpperCase();
  }

}
