import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType, ICompetitionDetails, IRank, RankingType } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';

@Component({
  selector: 'app-competition-results-rankings', 
  templateUrl: './competition-results-rankings.component.html',
  styleUrls: ['./competition-results-rankings.component.scss']
})
export class CompetitionResultsRankingsComponent implements OnInit {

  @Input() Competition!: ICompetitionDetails;

  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.GENERAL;
  ranking: IRank[] = [];

  activeTab: CompetitionResultsAndRankingsTabs = CompetitionResultsAndRankingsTabs.RESULTS;
  CompetitionResultsAndRankingsTabs = CompetitionResultsAndRankingsTabs;

  constructor(private competitionsService: CompetitionsService)
  { }

  async ngOnInit(): Promise<void> {
  }

  TabActiveClass = (tabType: CompetitionResultsAndRankingsTabs) => {
    return tabType === this.activeTab ? "active" : "";
  }

  OnTabClick = (tabType: CompetitionResultsAndRankingsTabs): void => {
    this.activeTab = tabType;
  }

  IsTabContentVisible = (tabType: CompetitionResultsAndRankingsTabs) => {
    return tabType === this.activeTab;
  }

  get HasCompetitionStarted(): boolean {
    return this.Competition.state !== CompetitionStateType.DRAFT;
  }
}

enum CompetitionResultsAndRankingsTabs {
  RESULTS = 0,
  RANKINGS = 1
}