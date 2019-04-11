import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraFormComponent } from './camera/camera-form/camera-form.component';
import { CameraListComponent } from './camera/camera-list/camera-list.component';
import { RouterModule } from '@angular/router';
import { DeviceRouter } from './device.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from 'app/md/md.module';
import { MaterialModule } from 'app/app.module';
import { TranslationPipeModule } from 'app/shared/translation/translation-pipe.module';
import { GateFormComponent } from './gate/gate-form/gate-form.component';
import { GateListComponent } from './gate/gate-list/gate-list.component';

@NgModule({
  imports: [
    RouterModule.forChild(DeviceRouter),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    TranslationPipeModule,
  ],
  declarations: [CameraFormComponent, CameraListComponent, GateFormComponent, GateListComponent]
})
export class DeviceModule { }
