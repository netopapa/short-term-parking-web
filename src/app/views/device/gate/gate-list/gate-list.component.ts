import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from 'app/service/translation/translation.service';
import { CameraService } from 'app/service/camera/camera.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GateFormComponent } from '../gate-form/gate-form.component';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { Location } from '@angular/common';
import { Gate } from 'app/model/gate.model';
import { GateService } from 'app/service/gate/gate.service';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gate-list',
  templateUrl: './gate-list.component.html',
  styleUrls: ['./gate-list.component.scss']
})
export class GateListComponent extends GenericListComponent<Gate, GateService> {

  @ViewChild('gateModal') gateModal: GateFormComponent;
  private timerSubscription: AnonymousSubscription;

  private commentsSubscription: AnonymousSubscription;
  constructor(
    translate: TranslationService,
    service: GateService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
    //this.timeout();
  }

  timeout() {
    setTimeout(() => {
      this.refreshData();
      this.timeout();
    }, 5000);
  }

showModal(gate ?: Gate): void {
  this.gateModal.initModal(gate);
}
}
