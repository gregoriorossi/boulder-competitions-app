import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessCompetitionFormComponent } from './components/access-competition/access-competition-form/access-competition-form.component';
import { AccessCompetitionComponent } from './components/access-competition/access-competition.component';
import { CompetitionStateLabelComponent } from './components/common/competition-state-label/competition-state-label.component';
import { ConfirmationModalComponent } from './components/common/confirmation-modal/confirmation-modal.component';
import { ToastComponent } from './components/common/toast/toast.component';
import { UsefulInformationComponent } from './components/common/useful-information/useful-information.component';
import { CompetitonInfoComponent } from './components/competition/competition-info/competition-info.component';
import { CompetitonProblemsComponent } from './components/competition/competition-problems/competition-problems.component';
import { CompetitionRankingsComponent } from './components/competition/competition-rankings/competition-rankings.component';
import { CompetitonComponent } from './components/competition/competition.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationFormPageComponent } from './components/registration-form-page/registration-form-page.component';
import { RegistrationFormComponent } from './components/registration-form-page/registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AccessCompetitionComponent,
    AccessCompetitionFormComponent,
    CompetitonComponent,
    CompetitonInfoComponent,
    CompetitonProblemsComponent,
    CompetitionRankingsComponent,
    CompetitionStateLabelComponent,
    ConfirmationModalComponent,
    RegistrationFormComponent,
    RegistrationFormPageComponent,
    ToastComponent,
    UsefulInformationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'registrati/:id', component: RegistrationFormPageComponent },
      { path: 'gara/:path', component: CompetitonComponent },
      { path: 'accedi/:id', component: AccessCompetitionComponent },
      { path: 'accedi', component: AccessCompetitionComponent },
      { path: '', redirectTo: '/accedi', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    CookieService
    //{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
