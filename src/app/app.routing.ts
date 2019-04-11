import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

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
                path: 'environments',
                loadChildren: './views/environment/environment.module#EnvironmentModule',
            },
            {
                path: 'persons',
                loadChildren: './views/persons/persons.module#PersonsModule',
            },
            {
                path: 'devices',
                loadChildren: './views/device/device.module#DeviceModule',
            },
            {
                path: 'settings',
                loadChildren: './views/settings/settings.module#SettingsModule',
            },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        },
        ]
    }
];
