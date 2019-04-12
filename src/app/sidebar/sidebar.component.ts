import { AfterViewInit, Component, OnInit } from '@angular/core';

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
        title: 'Estacionamento',
        type: 'link',
        icontype: 'timer'
    },
    {
        path: '/control/log',
        title: 'Histórico',
        type: 'link',
        icontype: 'assignment'
    },
    {
        path: '/car',
        title: 'Veículos',
        type: 'link',
        icontype: 'directions_car'
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: any[];

    constructor() { }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    ngAfterViewInit() {
        setInterval(() => {
            $('#img-logo').addClass('anime-rotate');
            setTimeout(() => {
                $('#img-logo').removeClass('anime-rotate');
            }, 3000);
        }, 15000);
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
