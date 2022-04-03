import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AddSeedComponent } from './add-seed/add-seed.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataService} from './data.service';
import { ManageGardensComponent } from './manage-gardens/manage-gardens.component';
import { GardenViewComponent } from './garden-view/garden-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSeedComponent,
    ManageGardensComponent,
    GardenViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
