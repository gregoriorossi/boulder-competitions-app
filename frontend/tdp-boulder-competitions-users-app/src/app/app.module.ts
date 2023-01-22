import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './components/common/confirmation-modal/confirmation-modal.component';
import { ToastComponent } from './components/common/toast/toast.component';
import { CompetitonComponent } from './components/competition/competition.component';
import { RegistrationFormPageComponent } from './components/registration-form-page/registration-form-page.component';
import { RegistrationFormComponent } from './components/registration-form-page/registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitonComponent,
    ConfirmationModalComponent,
    RegistrationFormComponent,
    RegistrationFormPageComponent,
    ToastComponent
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
      { path: 'gara/:id/:user', component: CompetitonComponent }
    ])
  ],
  providers: [
    //{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
