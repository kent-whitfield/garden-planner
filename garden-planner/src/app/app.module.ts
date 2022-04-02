import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddSeedComponent } from './add-seed/add-seed.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    AddSeedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
