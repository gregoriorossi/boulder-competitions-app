import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType, ICompetition, IProblem, IRank, IRankingSpecialProblem, RankingType } from '../../../../models/competitions.models';
import { CompetitionsService } from '../../../../services/competitions.service';

@Component({
  selector: 'app-competition-rankings',
  templateUrl: './competition-rankings.component.html',
  styleUrls: ['./competition-rankings.component.scss']
})
export class CompetitionRankingsComponent implements OnInit {

  @Input() Competition!: ICompetition;

  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.MALE;
  ranking: IRank[] = [];
  specialProblems: IRankingSpecialProblem[] = [];

  constructor(private competitionsService: CompetitionsService)
  { }

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

  get HasCompetitionStarted(): boolean {
    return this.Competition.State !== CompetitionStateType.DRAFT;
  }

  GetSectionTitle = (): string => {
    if (this.rankingType === RankingType.MALE)
      return "Classifica Maschile";
    else 
      return "Classifica Femminile";
  }

  OnDownloadButtonClick = async (): Promise<void> => {
    await this.competitionsService.DownloadRanking(this.Competition.Id, this.rankingType);
  }

  OnRefreshClick = async (): Promise<void> => {
    await this.LoadRanking();
  }
}

