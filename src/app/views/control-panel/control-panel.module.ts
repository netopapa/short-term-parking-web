import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/app.module';
import { MdModule } from 'app/md/md.module';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ControlRouter } from './control-panel.router';
import { InsideListComponent } from './inside-list/inside-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

@NgModule({
  imports: [
    RouterModule.forChild(ControlRouter),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
  ],
  declarations: [
    InsideListComponent,
    RegistrationListComponent,
    CheckinFormComponent,
    CheckoutFormComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
})
export class ControlPanelModule { }
