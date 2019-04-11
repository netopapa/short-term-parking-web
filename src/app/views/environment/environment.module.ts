import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorFormComponent } from './sector/sector-form/sector-form.component';
import { SectorListComponent } from './sector/sector-list/sector-list.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitFormComponent } from './unit/unit-form/unit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from 'app/md/md.module';
import { MaterialModule } from 'app/app.module';
import { TranslationPipeModule } from 'app/shared/translation/translation-pipe.module';
import { RouterModule } from '@angular/router';
import { EnvironmentRouter } from './environment.routing';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaFormComponent } from './area/area-form/area-form.component';
import { EasyAutocompleteModule } from 'app/shared/autocomplete/autocomplete.component';
import { ProductionLineFormComponent } from './productionLine/production-line-form/production-line-form.component';
import { ProductionLineListComponent } from './productionLine/production-line-list/production-line-list.component';
import { StationFormComponent } from './station/station-form/station-form.component';
import { StationListComponent } from './station/station-list/station-list.component';

@NgModule({
  imports: [
    RouterModule.forChild(EnvironmentRouter),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    TranslationPipeModule,
    EasyAutocompleteModule
  ],
  declarations: [
    SectorFormComponent,
    SectorListComponent,
    UnitListComponent,
    UnitFormComponent,
    AreaListComponent,
    AreaFormComponent,
    ProductionLineFormComponent,
    ProductionLineListComponent,
    StationFormComponent,
    StationListComponent,
  ]
})
export class EnvironmentModule { }
