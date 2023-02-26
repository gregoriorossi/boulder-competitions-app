import { Component, Input, OnInit } from "@angular/core";
import { ICompetition, ICompetitionResult, IProblemsGroupColor } from "../../../../models/competitions.models";
import { CompetitionsService } from "../../../../services/competitions.service";
import { ColorsUtils } from "../../../../utils/colors.utils";


@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  @Input() Competition!: ICompetition;

  CompetitionResults: ICompetitionResult[] = [];
  
  constructor(private competitionsService: CompetitionsService) {
  }

  async ngOnInit(): Promise<void> {
    this.CompetitionResults = await this.competitionsService.GetResults(this.Competition.id);
  }

  get Header(): IProblemsGroupColor[] {
    return this.CompetitionResults[0].ProblemsGroups;
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssCByColor(color);
  }

  GetRandomBool = () => {
    return Math.random() < 0.5;
  }
}
