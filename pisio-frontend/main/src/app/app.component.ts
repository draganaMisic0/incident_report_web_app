import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './routes/sessions/login/login.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

const MODULES=[
  CommonModule,
  RouterOutlet,
  LoginComponent, 
  DashboardComponent
];
@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [MODULES],
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
