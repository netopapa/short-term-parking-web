import { Component } from '@angular/core';
import { Registration } from 'app/model/registration.model';
import { RegistrationService } from 'app/service/registration/registration.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {

  today: Date = new Date();
  startDate: Date;
  endDate: Date;
  includeInsides = false;

  log: Registration[] = [];

  constructor(private service: RegistrationService) { }

  public printPage(): void {
    window.print();
  }

  getSearch(): void {
    this.service.findBetween(this.startDate, this.endDate, this.includeInsides).subscribe(
      success => {
        this.log = success;
      }
    );
  }

  changeInside(): void {
    this.includeInsides = !this.includeInsides;
  }

  checkDates(): boolean {
    return this.startDate && this.endDate ? true : false;
  }

  getTotal(): number {
    if (this.log.length < 1) {
      return 0;
    } else {
      let total = 0;
      for (let i = 0; i < this.log.length; i++) {
        if (this.log[i].value) {
          total += this.log[i].value;
        }
      }

      return total;
    }
  }

}
