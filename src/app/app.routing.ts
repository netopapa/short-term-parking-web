import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
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
            },
        ]
    }
];
