import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { InsideListComponent } from './inside-list/inside-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InsideListComponent,
    RegistrationListComponent,
    CheckinFormComponent,
    CheckoutFormComponent
  ]
})
export class ControlPanelModule { }
