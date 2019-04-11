import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera } from 'app/model/camera.model';
import { CameraService } from 'app/service/camera/camera.service';
import { TranslationService } from 'app/service/translation/translation.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { CameraFormComponent } from '../camera-form/camera-form.component';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss']
})
export class CameraListComponent extends GenericListComponent<Camera, CameraService> {

  @ViewChild('cameraModal') cameraModal: CameraFormComponent;

  constructor(
    translate: TranslationService,
    service: CameraService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
    //this.timeout();
  }
  timeout() {
    setTimeout(() => {
      this.refreshData();
      this.loadList().subscribe(list_=>{
        this.list = list_.content;
      })
      this.timeout();
    }, 5000);
  }

  showModal(camera?: Camera): void {
    this.cameraModal.initModal(camera);
  }

}
