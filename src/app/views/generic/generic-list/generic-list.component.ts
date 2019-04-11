import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BaseModel } from 'app/model/base.model';
import { CrudService } from 'app/service/generic-crud/generic-crud.service';
import { MessageType, SwalType } from 'app/service/toast-notification-service/message-type.enum';
import { ToastService } from 'app/service/toast-notification-service/toast-service/toast.service';
import swal from 'sweetalert2';
import { TranslationService } from 'app/service/translation/translation.service';
import { Paginable } from 'app/model/paginable.model';
import { StatusEntity } from 'app/model/statusEntity.enum';

declare const $: any;

export abstract class GenericListComponent<TModel extends any, TService extends CrudService<TModel>>
    implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('table') table: any;

    displayedColumns = [];
    dataSource: MatTableDataSource<TModel>;

    recordDeletedMsg: any = 'Item deletado !';
    recordEnabledMsg: any = 'Item ativado !';
    recordDisabledMsg: any = 'Item desativado !';

    list: TModel[];

    constructor(
        public translateService: TranslationService,
        public service: TService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public location: Location
    ) { }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.list);
        this.refreshData();
    }

    toast(msg: string, type?: MessageType) {
        ToastService.show(msg, type);
    }

    getFilteredRows(): Array<TModel> {
        if (this.dataSource) {
            return this.dataSource.filteredData;
        }

        return [];
    }

    loadList(): Observable<Paginable<TModel>> {

        return this.service.getAllList();

    }

    refreshData() {
        const _onFinish = (list) => {
            this.dataSource.data = list.content;
            // Nao esconde mais a sidebar
            // Util.hideSideBar();
        };
        this.loadList().subscribe(_onFinish, () => _onFinish([]));
    }

    getLocation() {
        const tree = this.router.parseUrl(this.router.url);

        return tree.root.children['primary'].segments.map(it => it.path).join('/');
    }

    view(obj: TModel) {
        this.router.navigate([this.getLocation() + '/form', obj.id.toString()]);
    }

    edit(obj: TModel) {
        const url = this.getLocation();
        let formUrl = url.replace('/registros', '');
        formUrl += '/form';
        this.router.navigate([formUrl, obj.id.toString()]);
    }

    newRecord() {
        const url = this.getLocation();
        let formUrl = url.replace('/registros', '');
        formUrl += '/form';
        this.router.navigate([formUrl]);
    }

    delete(obj: TModel) {
        this.service.delete(obj.id).subscribe(
            success => {
                setTimeout(() => {
                    this.refreshData();
                }, 100);

                this.toast(this.recordDeletedMsg, MessageType.SUCCESS);
            },
            error => {
                console.log(`erro: ${error}`);
            }
        );
    }

    changeStatus(obj: TModel) {
        this.service.changeStatus(obj.id).subscribe(
            success => {
                this.refreshData();
            },
            error => {
                console.log(`erro: ${error}`);
            }
        );
    }

    enable(obj: TModel) {
        this.service.enable(obj.id).subscribe(
            success => {
                this.refreshData();

                this.toast(this.recordEnabledMsg, MessageType.SUCCESS);
            },
            error => {
                console.log(`erro: ${error}`);
            }
        );
    }

    disable(obj: TModel) {
        this.service.disable(obj.id).subscribe(
            success => {
                this.refreshData();

                this.toast(this.recordDisabledMsg, MessageType.SUCCESS);
            },
            error => {
                console.log(`erro: ${error}`);
            }
        );
    }

    deleteItem(obj: TModel) {
        swal(this.swalContent(this.translateService.instant(SwalType.DELETE))
        ).then(function () {
            this.delete(obj);
        }.bind(this)).catch(swal.noop);
    }

    disableItem(obj: TModel) {
        swal(this.swalContent(SwalType.DISABLE)
        ).then(function () {
            this.disable(obj);
        }.bind(this),
            (dismiss) => {
                if (dismiss === 'cancel') {
                    this.refreshData();
                }
            }).catch(swal.noop);
        this.refreshData();
    }

    enableDisable(obj: TModel) {
        if (obj.status === 'ATIVO') {
            this.disableItem(obj);
        } else {
            this.enable(obj);
        }
    }

    swalContent(text: string, type = 'warning'): any {
        return {
            title: this.translateService.translate('Tem certeza?'),
            text: text,
            type: type,
            showCancelButton: true,
            confirmButtonText: this.translateService.translate('Sim') + '!',
            cancelButtonText: this.translateService.translate('Não'),
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        };
    }

    // configurações da tabela
    async ngAfterViewInit() {

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        setTimeout(function () {
            this.displayedColumns = this.table._contentColumnDefs._results.map(o => o.name);
        }.bind(this), 0);

        this.paginator._intl.itemsPerPageLabel = this.translateService.translate('Itens por página');
        this.paginator._intl.firstPageLabel = this.translateService.translate('Primeira página');
        this.paginator._intl.nextPageLabel = this.translateService.translate('Próxima página');
        this.paginator._intl.previousPageLabel = this.translateService.translate('Página anterior');
        this.paginator._intl.lastPageLabel = this.translateService.translate('Última página');
        this.paginator._intl.getRangeLabel = this.getPortugueseRangeLabel;

        $('.generic-modal').on('hide.bs.modal', (e) => {
            setTimeout(() => this.refreshData(), 500);
        });
    }

    getPortugueseRangeLabel(page: number, pageSize: number, length: number) {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

}
