import { Component, OnInit } from '@angular/core';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent extends GenericListComponent<Registration, RegistrationService> {

  // @ViewChild('checkinForm') checkinForm: CheckinFormComponent;

  constructor(
    service: RegistrationService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(service, router, activedRouter, location);
  }

  showModal(checkin?: Registration): void {
    // this.checkinForm.initModal('#checkoutModal', checkin);
  }

}
