import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';

export const SettingsRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                component: UserListComponent
            },
        ]
    }
];
