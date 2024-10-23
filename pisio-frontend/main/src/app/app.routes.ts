import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import { MapComponent } from './routes/map/map.component';
import { MapRefreshComponent } from './routes/map/map-refresh/map-refresh.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'map-refresh', component: MapRefreshComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      
     
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'forms',
        loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      },
     
     
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
