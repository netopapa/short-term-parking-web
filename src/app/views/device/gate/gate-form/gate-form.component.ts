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
import { Gate } from 'app/model/gate.model';
import { GateService } from 'app/service/gate/gate.service';

declare var $: any;

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.scss']
})
export class GateFormComponent extends GenericFormComponent<Gate, GateService> implements AfterViewInit {
  @ViewChild('gateForm') gateForm: NgForm;

  areas: Area[] = [];
  gates: Gate[] = [];

  constructor(
    private areaService: AreaService,
    service: GateService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, Gate);
  }

  ngAfterViewInit(): void {
    $('#cameraModal').on('hide.bs.modal', () => {
      this.clearForm(this.gateForm);
    });
  }

  beforeSave() {
  }

  public initModal(gate?: Gate): void {
    if (gate) {
      Object.assign(this.obj, gate);
      
      this.edit = true;
    } else {
      this.obj = new Gate();
      this.edit = false;
    }
    this.getAreas();
    $('#gateModal').modal('show');
  }

  closeModal(): void {
    $('#gateodal').modal('hide');
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
        this.gates = success;
      }
    );
  }

  alreadyAssociated(areaId: string): boolean {
    return this.obj.area !== null && this.gates.find(gate => gate.area.id === areaId &&
      this.obj.code === gate.code &&
      gate.id !== this.obj.id) ? true : false;
  }

  getHolderArea(): string {
    if (this.areas.length < 1) {
      return 'Não há áreas cadastradas';
    } else {
      return 'Áreas';
    }
  }

}
