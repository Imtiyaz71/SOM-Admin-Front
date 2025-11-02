import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ClientComponent } from './main/client/client.component';
import { AuthGuard } from './services/auth.guard';
import { ModuleentryComponent } from './main/moduleentry/moduleentry.component';
import { MenuentryComponent } from './main/menuentry/menuentry.component';
import { ClientstatusComponent } from './main/clientstatus/clientstatus.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard], // protect main
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'client', component: ClientComponent },
     { path: 'module', component: ModuleentryComponent },
       { path: 'menu', component: MenuentryComponent },
          { path: 'clientstatus', component: ClientstatusComponent },
    ]
  },
  { path: '**', redirectTo: 'login' } // fallback
];
