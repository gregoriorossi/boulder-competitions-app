import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { AthletesComponent } from './components/athletes/athletes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { CompetitionResultsComponent } from './components/competition/competition-results/competition-results.component';
import { CompetitionProblemsComponent } from './components/competition/competition-problems/competition-problems.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    HeaderComponent,
    CompetitionsComponent,
    AthletesComponent,
    PageNotFoundComponent,
    CompetitionComponent,
    CompetitionResultsComponent,
    CompetitionProblemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'gare', component: CompetitionsComponent },
      { path: '', redirectTo: '/gare', pathMatch: 'full' },
      { path: 'atleti', component: AthletesComponent },
      { path: 'gara', component: CompetitionComponent },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
