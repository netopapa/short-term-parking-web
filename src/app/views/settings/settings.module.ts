import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/app.module';
import { MdModule } from 'app/md/md.module';
import { TranslationPipeModule } from 'app/shared/translation/translation-pipe.module';
import { SettingsRouter } from './settings.routing';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

@NgModule({
  imports: [
    RouterModule.forChild(SettingsRouter),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    TranslationPipeModule,
  ],
  declarations: [
    UserFormComponent,
    UserListComponent
  ]
})
export class SettingsModule { }
