import { Routes } from '@angular/router';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { SectorListComponent } from './sector/sector-list/sector-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { ProductionLineListComponent } from './productionLine/production-line-list/production-line-list.component';
import { StationListComponent } from './station/station-list/station-list.component';

export const EnvironmentRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'unit',
                component: UnitListComponent
            },
            {
                path: 'sector',
                component: SectorListComponent
            },
            {
                path: 'area',
                component: AreaListComponent
            },
            {
                path: 'line',
                component: ProductionLineListComponent
            },
            {
                path: 'station',
                component: StationListComponent
            },
        ]
    }
];
