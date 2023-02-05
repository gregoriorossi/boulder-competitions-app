import { Component, Input, OnInit } from "@angular/core";
import { IGetCompetitionProblemsByAthleteResponse, IProblemsGroupColor } from "../../../models/competitions.models";
import { CompetitionsService } from "../../../services/competitions.service";
import { ColorsUtils } from "../../../utils/colors.utils";

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitonProblemsComponent implements OnInit {

  @Input() CompetitionId!: string;
  @Input() UserId!: string;


  protected ProblemGroups: IProblemsGroupColor[] = [];

  constructor(private competitionsService: CompetitionsService)
  { }


  async ngOnInit(): Promise<void> {
    const response: IGetCompetitionProblemsByAthleteResponse = await this.competitionsService.GetCompetitionProblemsByAthleteRequest(this.CompetitionId, this.UserId)
    this.ProblemGroups = response.ProblemsGroups;
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssCByColor(color);
  }
}
