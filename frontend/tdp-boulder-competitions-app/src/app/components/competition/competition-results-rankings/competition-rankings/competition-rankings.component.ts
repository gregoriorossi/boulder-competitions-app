import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType, ICompetition, IRank, RankingType } from '../../../../models/competitions.models';
import { CompetitionsService } from '../../../../services/competitions.service';

@Component({
  selector: 'app-competition-rankings',
  templateUrl: './competition-rankings.component.html',
  styleUrls: ['./competition-rankings.component.scss']
})
export class CompetitionRankingsComponent implements OnInit {

  @Input() Competition!: ICompetition;

  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.GENERAL;
  ranking: IRank[] = [];

  constructor(private competitionsService: CompetitionsService)
  { }

  async ngOnInit(): Promise<void> {
    await this.LoadRanking();
  }

  OnRankingTypeChange = async (e: any): Promise<void> => {
    await this.LoadRanking();
  }

  LoadRanking = async (): Promise<void> => {
    this.ranking = await this.competitionsService.GetRanking(this.Competition.Id, this.rankingType);
  }

  get HasCompetitionStarted(): boolean {
    return this.Competition.State !== CompetitionStateType.DRAFT;
  }

  GetSectionTitle = (): string => {
    if (this.rankingType === RankingType.GENERAL)
      return "Classifica Generale";
    if (this.rankingType === RankingType.MALE)
      return "Classifica Maschile";
    else 
      return "Classifica Femminile";
  }

  OnDownloadButtonClick = async (): Promise<void> => {
    await this.competitionsService.DownloadRanking(this.Competition.Id, this.rankingType);
  }

  OnRefreshClick = async (): Promise<void> => {
    this.ranking = await this.competitionsService.GetRanking(this.Competition.Id, this.rankingType)
  }
}

