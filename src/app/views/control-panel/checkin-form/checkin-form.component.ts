import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent extends GenericFormComponent<Registration, RegistrationService> implements AfterViewInit {

  hour = '';

  constructor(
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

  beforeShowModal() {
    this.hour = this.obj.checkin.toTimeString().slice(0, 5);
  }

}
