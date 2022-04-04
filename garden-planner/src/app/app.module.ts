import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';

import {DataService} from './data.service';
import { ManageGardensComponent } from './manage-gardens/manage-gardens.component';
import { GardenViewComponent } from './garden-view/garden-view.component';
import { ManageSeedsComponent } from './manage-seeds/manage-seeds.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: ManageGardensComponent},
  {path: 'seeds', component: ManageSeedsComponent},
  {path: 'gardens', component: ManageGardensComponent},
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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DataService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
