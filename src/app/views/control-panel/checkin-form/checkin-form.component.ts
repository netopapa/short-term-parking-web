import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shifts } from 'app/constant/price-table';
import { Car } from 'app/model/car.model';
import { Registration } from 'app/model/registration.model';
import { CarService } from 'app/service/car/car.service';
import { RegistrationService } from 'app/service/registration/registration.service';
import { ParkingService } from 'app/util/parking.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent extends GenericFormComponent<Registration, RegistrationService> implements AfterViewInit {

  cars: Car[] = [];
  hour = '';
  closed = false;

  constructor(
    private carService: CarService,
    private parkingService: ParkingService,
    service: RegistrationService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location,
  ) {
    super(router, activatedRoute, service, location, Registration);
  }

  ngAfterViewInit(): void {
    $('#checkinModal').on('hide.bs.modal', () => {
      this.obj = new Registration();
    });

    $('#checkinModal').on('show.bs.modal', () => {
      this.getCars();
      this.closed = this.parkingService.getShift() === Shifts.NIGHT && !this.edit ? true : false;
    });
  }

  beforeShowModal() {
    this.hour = new Date(this.obj.checkin).toTimeString().slice(0, 5);
  }

  getCars(): void {
    this.carService.getAll().subscribe(
      success => {
        this.cars = success;
      }
    );
  }

  plateAlreadyExists(): Boolean {
    return this.cars.find(item => item.plate === this.obj.car.plate) ? true : false;
  }

  setCar(): void {
    if (this.plateAlreadyExists()) {
      Object.assign(this.obj.car, this.cars.find(item => item.plate === this.obj.car.plate));
    } else {
      this.obj.car.id = null;
    }
  }

}
