import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';
import { ParkingService } from 'app/util/parking.service';
declare var $: any;

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent extends GenericFormComponent<Registration, RegistrationService> implements AfterViewInit {

  isHolyday = false;

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
  }

  beforeShowModal(): void {
    this.obj.checkout = new Date();
    this.obj.value = this.parkingService.generateValue(this.isHolyday);
  }

  switchHolyday(): void {
    this.isHolyday = !this.isHolyday;
    this.obj.value = this.parkingService.generateValue(this.isHolyday);
  }

}
