import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { HttpClientInMemoryWebApiModule }  from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroService } from './hero.service';
import { MessagesService } from './messages.service';
import { MessagesComponent } from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
   HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService , {dataEncapsulation: false})],
  declarations: [ AppComponent, HeroesComponent, HeroDetailsComponent, MessagesComponent, DashboardComponent, HeroSearchComponent ],
  bootstrap:    [ AppComponent ],
  providers: [HeroService, MessagesService, InMemoryDataService]
})
export class AppModule { }
