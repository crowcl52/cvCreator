import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewerComponent } from './viewer/viewer.component';
import { DASHBOARDROUTES } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '', component: DashboardComponent,
        children: DASHBOARDROUTES,
        canActivate: [AuthGuardService]
    },
    {path: 'view/:id', component: ViewerComponent},
    {path: '**', redirectTo: ''}
];


@NgModule({
    imports: [
        RouterModule.forRoot( ROUTES )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
