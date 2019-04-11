import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { RouterModule } from '@angular/router';
import { PersonsRouter } from './persons.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from 'app/md/md.module';
import { MaterialModule } from 'app/app.module';
import { TranslationPipeModule } from 'app/shared/translation/translation-pipe.module';
import { EasyAutocompleteModule } from 'app/shared/autocomplete/autocomplete.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { VisitorFormComponent } from './visitor/visitor-form/visitor-form.component';
import { VisitorListComponent } from './visitor/visitor-list/visitor-list.component';
import { MadiaAttachmentModule } from 'app/shared/media-attachment/media-attachment.component';
import { EmployeeDetailsModule } from 'app/shared/employee-details/employee-details.component';

@NgModule({
  imports: [
    RouterModule.forChild(PersonsRouter),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    TranslationPipeModule,
    EasyAutocompleteModule,
    MadiaAttachmentModule,
    EmployeeDetailsModule
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent,
    VisitorFormComponent,
    VisitorListComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
  ]
})
export class PersonsModule { }
