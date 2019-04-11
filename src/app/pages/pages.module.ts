import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/app.module';

import { PagesRoutes } from './pages.routing';
import { TranslationPipeModule } from 'app/shared/translation/translation-pipe.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslationPipeModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})

export class PagesModule { }
