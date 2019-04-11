import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule } from '@angular/core';
import { Employee } from 'app/model/employee.model';
import { TranslationPipeModule } from '../translation/translation-pipe.module';

declare var $: any;

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements AfterViewInit {

  employee = new Employee();

  constructor() { }

  ngAfterViewInit() {
    $('#employeeDetailsModal').on('show.bs.modal', () => {
    });
  }

  closeModal(): void {
    $('#employeeDetailsModal').modal('hide');
  }

  showModal(item: Employee): void {
    this.employee = item;
    $('#employeeDetailsModal').modal('show');
  }

}

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [CommonModule, TranslationPipeModule],
  exports: [EmployeeDetailsComponent]
})
export class EmployeeDetailsModule { }
