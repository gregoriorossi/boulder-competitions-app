import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICompetitionInfo } from "../../models/competitions.models";
import { IRegistrationFormPageContent } from "../../models/registration.models";
import { CompetitionsService } from "../../services/competitions.service";

@Component({
  selector: 'app-registration-form-page',
  templateUrl: './registration-form-page.component.html',
  styleUrls: ['./registration-form-page.component.scss']
})
export class RegistrationFormPageComponent implements OnInit {

  protected competition!: ICompetitionInfo;

  content!: IRegistrationFormPageContent;
  isErrorMessageVisible: boolean = false;
  isRegistrationConfirmationMessageVisible: boolean = false;
  registrationFormVisible: boolean = false;

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {

    this.content = {
      ErrorMessage: "Errore nella registrazione. Riprova o contattaci",
      SuccessMessage: "Registrazione avvenuta con successo. A breve riceverai una email di conferma"
    };

    this.activetedRoute.params.subscribe(async params => {
      const competitionId = params["id"];
      
      const result = await this.competitionsService.GetCompetitionInfoByPath(competitionId);
      this.competition = result;
      this.registrationFormVisible = this.competition.RegistrationsOpen;
    });
  }

  OnRegistration = (): void => {
    this.isRegistrationConfirmationMessageVisible = true;
    this.registrationFormVisible = false;
    // this.router.navigate(["/accedi", this.competition.Id]);
  }

  OnRegistrationError = (): void => {
    this.isErrorMessageVisible = true;
  }
}
