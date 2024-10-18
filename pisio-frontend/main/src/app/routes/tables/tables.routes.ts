import { Routes } from '@angular/router';

import { TablesKitchenSinkComponent } from './kitchen-sink/pending-incidents.component';
import { TablesPendingIncidentsComponent } from './list-of-incidents/list-of-incidents.component';

export const routes: Routes = [
  { path: 'pending-incidents', component: TablesKitchenSinkComponent },
  { path: 'list-of-incidents', component: TablesPendingIncidentsComponent },
];
