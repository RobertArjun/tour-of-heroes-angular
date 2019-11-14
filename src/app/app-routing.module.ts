import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailsComponent} from './hero-details/hero-details.component';

const routes:Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{path: 'heroes', component: HeroesComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'details/:id', component: HeroDetailsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }