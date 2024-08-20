import { Component, Input, OnInit } from "@angular/core";
import { CompetitionStateType, ICompetitionInfo, IRank, IRankingSpecialProblem, RankingType } from "../../../models/competitions.models";
import { CompetitionsService } from "../../../services/competitions.service";

@Component({
  selector: 'app-competition-rankings',
  templateUrl: './competition-rankings.component.html',
  styleUrls: ['./competition-rankings.component.scss']
})
export class CompetitionRankingsComponent implements OnInit {

  @Input() Competition!: ICompetitionInfo;
   
  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.MAN;
  ranking: IRank[] = [];
  specialProblems: IRankingSpecialProblem[] = [];

  constructor(private competitionsService: CompetitionsService)
  {}

  async ngOnInit(): Promise<void> {
    await this.LoadRanking();
  }

  OnRankingTypeChange = async (e: any): Promise<void> => {
    await this.LoadRanking();
  }

  LoadRanking = async (): Promise<void> => {
    const result = await this.competitionsService.GetRanking(this.Competition.Id, this.rankingType);
    this.ranking = result.Ranking;
    this.specialProblems = result.SpecialProblems;
  }

  GetSectionTitle = (): string => {
    if (this.rankingType === RankingType.MAN)
      return "Classifica Maschile";
    else
      return "Classifica Femminile";
  }
}
