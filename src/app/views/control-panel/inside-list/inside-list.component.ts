import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { CheckinFormComponent } from '../checkin-form/checkin-form.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';

@Component({
  selector: 'app-inside-list',
  templateUrl: './inside-list.component.html',
  styleUrls: ['./inside-list.component.scss']
})
export class InsideListComponent extends GenericListComponent<Registration, RegistrationService> {

  @ViewChild('checkinForm') checkinForm: CheckinFormComponent;
  @ViewChild('checkoutForm') checkoutForm: CheckoutFormComponent;

  constructor(
    service: RegistrationService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(service, router, activedRouter, location);
  }

  showModal(checkin?: Registration): void {
    this.checkinForm.initModal('#checkinModal', checkin);
  }

  showExitModal(checkout: Registration): void {
    this.checkoutForm.initModal('#checkoutModal', checkout);
  }

}
