import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionLineSimple } from 'app/model/production-line-simple.model';
import { ProductionLine } from 'app/model/production-line.model';
import { Sector } from 'app/model/sector.model';
import { ProductionLineService } from 'app/service/productionLine/production-line.service';
import { SectorService } from 'app/service/sector/sector.service';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';

declare var $: any;

@Component({
  selector: 'app-production-line-form',
  templateUrl: './production-line-form.component.html',
  styleUrls: ['./production-line-form.component.scss']
})
export class ProductionLineFormComponent extends GenericFormComponent<ProductionLine, ProductionLineService> implements AfterViewInit {

  @ViewChild('productionLineForm') productionLineForm: NgForm;

  sectors: Sector[] = [];
  lines: ProductionLine[] = [];

  constructor(
    private sectorService: SectorService,
    service: ProductionLineService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, ProductionLine);
  }

  ngAfterViewInit(): void {
    $('#sectorModal').on('hide.bs.modal', () => {
      this.clearForm(this.productionLineForm);
    });
  }

  clearForm(idForm: NgForm) {
    super.clearForm(idForm);
  }

  public initModal(line?: ProductionLineSimple): void {
    if (line) {
      Object.assign(this.obj, line);
      this.obj.sector.id = line.sector_id;
      this.edit = true;
    } else {
      this.obj = new ProductionLine();
      this.edit = false;
    }
    this.getAllSectors();
    this.getLines();
    $('#productionLineModal').modal('show');
  }

  closeModal(): void {
    $('#productionLineModal').modal('hide');
  }

  getAllSectors(): void {
    this.sectorService.getAll().subscribe(
      success => {
        this.sectors = success;
      }
    );
  }

  getLines(): void {
    this.service.getAll().subscribe(
      success => {
        this.lines = success;
      }
    );
  }

  alreadyAssociated(sectorId: string): boolean {
    return this.lines.find(line => line.sector.id === sectorId &&
      this.obj.name === line.name &&
      line.id !== this.obj.id) ? true : false;
  }

}
