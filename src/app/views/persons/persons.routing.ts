import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { VisitorListComponent } from './visitor/visitor-list/visitor-list.component';

export const PersonsRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'employee',
                component: EmployeeListComponent
            },
            {
                path: 'employee/form',
                component: EmployeeFormComponent
            },
            {
                path: 'employee/form/:id',
                component: EmployeeFormComponent
            },
            {
                path: 'visitor',
                component: VisitorListComponent
            },
        ]
    }
];
