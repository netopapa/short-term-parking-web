import { Routes } from '@angular/router';
import { CameraListComponent } from './camera/camera-list/camera-list.component';
import { GateListComponent } from './gate/gate-list/gate-list.component';

export const DeviceRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'camera',
                component: CameraListComponent
            },
            {
                path: 'gate',
                component: GateListComponent
            }
        ]
    }
];
