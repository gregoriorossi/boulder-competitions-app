import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICompetition } from "../../models/competitions.models";
import { CompetitionsService } from "../../services/competitions.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  protected competition!: ICompetition;

  constructor(
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.activetedRoute.params.subscribe(async params => {
      const competitionId = params["id"];
      const result = await this.competitionsService.GetCompetitionToRegisterFor(competitionId);
      this.competition = result.Competition;
    });
  }

}
