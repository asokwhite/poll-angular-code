import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './guards/auth-guard.service';

import { PollingComponent } from './polling/polling.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path: '', component: PollingComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
