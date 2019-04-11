import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/model/employee.model';
import { EmployeeService } from 'app/service/employee/employee.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { EmployeeDetailsComponent } from 'app/shared/employee-details/employee-details.component';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { EmployeeSimpleService } from 'app/service/employee-simple/employee-simple.service';
import { EmployeeSimple } from 'app/model/employee-simple.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends GenericListComponent<EmployeeSimple, EmployeeSimpleService> {

  @ViewChild('details') details: EmployeeDetailsComponent;

  constructor(
    translate: TranslationService,
    service: EmployeeSimpleService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showDetails(item: Employee): void {
    this.details.showModal(item);
  }
}
