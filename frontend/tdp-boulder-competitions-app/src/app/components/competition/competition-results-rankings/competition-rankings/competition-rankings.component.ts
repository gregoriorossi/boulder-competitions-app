import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType, ICompetitionDetails, IRank, RankingType } from '../../../../models/competitions.models';
import { CompetitionsService } from '../../../../services/competitions.service';

@Component({
  selector: 'app-competition-rankings',
  templateUrl: './competition-rankings.component.html',
  styleUrls: ['./competition-rankings.component.scss']
})
export class CompetitionRankingsComponent implements OnInit {

  @Input() Competition!: ICompetitionDetails;

  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.GENERAL;
  ranking: IRank[] = [];

  constructor(private competitionsService: CompetitionsService)
  { }

  async ngOnInit(): Promise<void> {
    await this.LoadRanking();
  }

  OnRankingTypeChange = async (e: any): Promise<void> => {
    console.log(e);
    await this.LoadRanking();
  }

  LoadRanking = async (): Promise<void> => {
    this.ranking = await this.competitionsService.GetRanking("1", this.rankingType);
  }

  get HasCompetitionStarted(): boolean {
    return this.Competition.state !== CompetitionStateType.DRAFT;
  }

  GetSectionTitle = (): string => {
    if (this.rankingType === RankingType.GENERAL)
      return "Classifica Generale";
    if (this.rankingType === RankingType.MAN)
      return "Classifica Maschile";
    if (this.rankingType === RankingType.WOMAN)
      return "Classifica Femminile";
    else
      return "Classifica Giovani";
  }

  OnDownloadClick = (): void => {
    alert('download!');
  }
}

