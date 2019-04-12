import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { PeriodComponent } from './reports/period/period.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'control',
                loadChildren: './views/control-panel/control-panel.module#ControlPanelModule',
            },
            {
                path: 'car',
                loadChildren: './views/car/car.module#CarModule',
            }
        ]
    },
    {
        path: 'reports/period',
        component: PeriodComponent
    }
];
