import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { EnsureAuthenticatedService } from './ensure-authenticated.service';
import { LoginRedirectService } from './login-redirect.service';
import { AnnounceService } from './announce.service';

import { ManageGardensComponent } from './manage-gardens/manage-gardens.component';
import { GardenViewComponent } from './garden-view/garden-view.component';
import { ManageSeedsComponent } from './manage-seeds/manage-seeds.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: ManageGardensComponent, canActivate: [EnsureAuthenticatedService]},
  {path: 'seeds', component: ManageSeedsComponent, canActivate: [EnsureAuthenticatedService]},
  {path: 'gardens', component: ManageGardensComponent, canActivate: [EnsureAuthenticatedService]},
  {path: 'login', component: LoginComponent, canActivate: [LoginRedirectService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginRedirectService]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
]

@NgModule({
  declarations: [
    AppComponent,
    ManageGardensComponent,
    GardenViewComponent,
    ManageSeedsComponent,
    PageNotFoundComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DataService,
    DatePipe,
    AuthService,
    EnsureAuthenticatedService,
    LoginRedirectService,
    AnnounceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
