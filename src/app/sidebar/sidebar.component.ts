import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'assessment'
    },
    {
        path: '/control/inside',
        title: 'Carros Estacionados',
        type: 'link',
        icontype: 'timer'
    },
    {
        path: '/control/registros',
        title: 'Registros Anteriores',
        type: 'link',
        icontype: 'assignment'
    },
    {
        path: '/control/carros',
        title: 'Lista de Carros',
        type: 'link',
        icontype: 'directions_car'
    },
    // {
    //     path: '/persons',
    //     title: 'Pessoas',
    //     type: 'sub',
    //     icontype: 'person',
    //     collapse: 'Pessoas',
    //     children: [
    //         { path: 'employee', title: 'Funcionários', ab: 'FNC' },
    //         { path: 'visitor', title: 'Visitantes', ab: 'LV' },
    //     ]
    // },
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private router: Router) { }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            // let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
        $('.collapse').collapse('hide');
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
