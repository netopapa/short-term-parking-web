import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';
import { Shifts } from 'app/constant/price-table';
import { ParkingService } from 'app/util/parking.service';

declare var $: any;

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent extends GenericFormComponent<Registration, RegistrationService> implements AfterViewInit {

  hour = '';
  closed = false;

  constructor(
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
      this.closed = this.parkingService.getShift() === Shifts.NIGHT && !this.edit ? true : false;
    });
  }

  beforeShowModal() {
    this.hour = new Date(this.obj.checkin).toTimeString().slice(0, 5);
  }

}
