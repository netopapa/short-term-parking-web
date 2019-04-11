import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { Visitor } from 'app/model/visitor.model';
import { VisitorService } from 'app/service/visitor/visitor.service';
import { VisitorFormComponent } from '../visitor-form/visitor-form.component';
import { TranslationService } from 'app/service/translation/translation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.scss']
})
export class VisitorListComponent extends GenericListComponent<Visitor, VisitorService> {

  @ViewChild('visitorModal') visitorModal: VisitorFormComponent;

  constructor(
    translate: TranslationService,
    service: VisitorService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(visitor?: Visitor): void {
    this.visitorModal.initModal(visitor);
  }

}
