import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddSeedComponent } from './add-seed/add-seed.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataService} from './data.service';
import { ManageGardensComponent } from './manage-gardens/manage-gardens.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSeedComponent,
    ManageGardensComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
