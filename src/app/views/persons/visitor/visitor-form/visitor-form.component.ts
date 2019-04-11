import { Location } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor } from 'app/model/visitor.model';
import { VisitorService } from 'app/service/visitor/visitor.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent extends GenericFormComponent<Visitor, VisitorService> implements AfterViewInit {
  @ViewChild('visitorForm') visitorForm: NgForm;

  constructor(
    service: VisitorService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Visitor);
  }

  ngAfterViewInit() {
    $('#visitorModal').on('hide.bs.modal', () => {
      this.visitorForm.resetForm();
    });
  }

  public initModal(visitor?: Visitor): void {
    if (visitor) {
      Object.assign(this.obj, visitor);
      this.edit = true;
    } else {
      this.obj = new Visitor();
      this.edit = false;
    }
    $('#visitorModal').modal('show');
  }

  closeModal(): void {
    $('#visitorModal').modal('hide');
  }

}
