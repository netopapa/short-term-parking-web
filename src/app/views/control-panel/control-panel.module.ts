import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideListComponent } from './inside-list/inside-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InsideListComponent, RegistrationListComponent, CarListComponent, CheckinFormComponent, CheckoutFormComponent]
})
export class ControlPanelModule { }
