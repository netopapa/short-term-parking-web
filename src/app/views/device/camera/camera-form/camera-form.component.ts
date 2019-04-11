import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'app/model/area.model';
import { Camera } from 'app/model/camera.model';
import { DeviceType } from 'app/model/deviceType.enum';
import { AreaService } from 'app/service/area/area.service';
import { CameraService } from 'app/service/camera/camera.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss']
})
export class CameraFormComponent extends GenericFormComponent<Camera, CameraService> implements AfterViewInit {
  @ViewChild('cameraForm') cameraForm: NgForm;

  areas: Area[] = [];
  cameras: Camera[] = [];

  constructor(
    private areaService: AreaService,
    service: CameraService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Camera);
  }

  ngAfterViewInit(): void {
    $('#cameraModal').on('hide.bs.modal', () => {
      this.clearForm(this.cameraForm);
    });
  }

  beforeSave() {
    if (this.obj.deviceType === DeviceType.TABLET) {
      this.obj.area = null;
    }
  }

  public initModal(camera?: Camera): void {
    if (camera) {
      Object.assign(this.obj, camera);
      if(camera.deviceType == "TABLET"){

        this.obj.area = new Area();
        // this.areaService.getAll().subscribe(areas=>{
        //   console.log(areas);
        //   this.areas = areas;
        // });
          
      }
      this.edit = true;
    } else {
      this.obj = new Camera();
      this.obj.deviceType = DeviceType.CAMERA;
      this.edit = false;
    }
    this.getAreas();
    $('#cameraModal').modal('show');
  }

  closeModal(): void {
    $('#cameraModal').modal('hide');
  }

  getAreas(): void {
    this.areaService.getAll().subscribe(
      success => {
        this.areas = success;
      }
    );
  }

  getCameras(): void {
    this.service.getAll().subscribe(
      success => {
        this.cameras = success;
      }
    );
  }

  alreadyAssociated(areaId: string): boolean {
    if (this.obj.deviceType === DeviceType.TABLET) {
      return false;
    }
    return this.obj.area !== null && this.cameras.find(camera => camera.area.id === areaId &&
      this.obj.name === camera.name &&
      camera.id !== this.obj.id) ? true : false;
  }

  getHolderArea(): string {
    if (this.areas.length < 1) {
      return 'Não há áreas cadastradas';
    } else {
      return 'Áreas';
    }
  }

}
