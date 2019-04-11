import { Routes } from '@angular/router';
import { InsideListComponent } from './inside-list/inside-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

export const ControlRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'inside',
                component: InsideListComponent
            },
            {
                path: 'log',
                component: RegistrationListComponent
            },
            {
                path: '**',
                component: InsideListComponent
            }
        ]
    }
];