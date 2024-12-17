import { Routes } from '@angular/router';

import { TablesKitchenSinkComponent } from './kitchen-sink/pending-incidents.component';
import { TablesPendingIncidentsComponent } from './list-of-incidents/list-of-incidents.component';
import { MagicRefreshComponent } from './kitchen-sink/magic-refresh.component';

export const routes: Routes = [
  { path: 'pending-incidents', component: TablesKitchenSinkComponent },
  { path: 'list-of-incidents', component: TablesPendingIncidentsComponent },
  { path: 'refresh', component: MagicRefreshComponent},
];
