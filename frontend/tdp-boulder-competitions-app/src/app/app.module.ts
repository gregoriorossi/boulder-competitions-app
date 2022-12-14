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
import { CompetitionProblemsComponent } from './components/competition/competition-problems/competition-problems.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCompetitionButtonComponent } from './components/competitions/new-competition-button/new-competition-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateCustomParserFormatter } from './utils/ngbDateCustomParserFormatter';
import { ToastComponent } from './components/common/toast/toast.component';
import { NewAthleteModalComponent } from './components/athletes/new-athlete-modal/new-athlete-modal.component';
import { NewAthleteFormComponent } from './components/common/new-athlete-form/new-athlete-form.component';
import { EditAthleteModalComponent } from './components/athletes/edit-athlete-modal/edit-athlete-modal.component';
import { ConfirmationModalComponent } from './components/common/confirmation-modal/confirmation-modal.component';
import { AddAthleteToCompetitionModalComponent } from './components/competition/add-athlete-to-competition-modal/add-athlete-to-competition-modal.component';
import { CompetitionRankingsComponent } from './components/competition/competition-rankings/competition-rankings.component';
import { CompetitionResultsComponent } from './components/competition/competition-athletes/competition-athletes.component';
import { CompetitionStateLabelComponent } from './components/common/competition-state-label/competition-state-label.component';
import { HttpClientModule } from '@angular/common/http';

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
    CompetitionProblemsComponent,
    NewCompetitionButtonComponent,
    ToastComponent,
    NewAthleteModalComponent,
    NewAthleteFormComponent,
    EditAthleteModalComponent,
    ConfirmationModalComponent,
    AddAthleteToCompetitionModalComponent,
    CompetitionRankingsComponent,
    CompetitionStateLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'gare', component: CompetitionsComponent },
      { path: 'atleti', component: AthletesComponent },
      { path: 'gare/:id', component: CompetitionComponent },
      { path: '', redirectTo: '/gare', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
