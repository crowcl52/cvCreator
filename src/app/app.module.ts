import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatorComponent } from './creator/creator.component';
import { InfoComponent } from './creator/info/info.component';
import { SkillComponent } from './creator/skill/skill.component';
import { WorkComponent } from './creator/work/work.component';
import { SchoolComponent } from './creator/school/school.component';
import { PortfolioComponent } from './creator/portfolio/portfolio.component';
import { ProfileImgComponent } from './creator/profile-img/profile-img.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreatorComponent,
    InfoComponent,
    SkillComponent,
    WorkComponent,
    SchoolComponent,
    PortfolioComponent,
    ProfileImgComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
