import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICompetition } from "../../models/competitions.models";
import { IRegistrationFormPageContent } from "../../models/registration.models";
import { CompetitionsService } from "../../services/competitions.service";

@Component({
  selector: 'app-registration-form-page',
  templateUrl: './registration-form-page.component.html',
  styleUrls: ['./registration-form-page.component.scss']
})
export class RegistrationFormPageComponent implements OnInit {

  protected competition!: ICompetition;

  content!: IRegistrationFormPageContent;
  isErrorMessageVisible: boolean = false;
  isSuccessMessageVisible: boolean = false;

  constructor(
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {

    this.content = {
      ErrorMessage: "Errore nella registrazione. Riprova o contattaci",
      SuccessMessage: "Registrazione avvenuta con successo. A breve riceverai una email di conferma"
    };

    this.activetedRoute.params.subscribe(async params => {
      const competitionId = params["id"];
      const result = await this.competitionsService.GetCompetitionToRegisterFor(competitionId);
      this.competition = result.Competition;
    });
  }

  OnRegistration = (): void => {
    this.isSuccessMessageVisible = true;
  }

  OnRegistrationError = (): void => {
    this.isErrorMessageVisible = true;
  }
}
