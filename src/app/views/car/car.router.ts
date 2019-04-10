import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const CarRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ListComponent
            },
            {
                path: '**',
                component: ListComponent
            }
        ]
    }
];