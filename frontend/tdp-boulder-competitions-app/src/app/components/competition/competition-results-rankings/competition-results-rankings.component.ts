import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType, ICompetition, IRank, RankingType } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';

@Component({
  selector: 'app-competition-results-rankings', 
  templateUrl: './competition-results-rankings.component.html',
  styleUrls: ['./competition-results-rankings.component.scss']
})
export class CompetitionResultsRankingsComponent implements OnInit {

  @Input() Competition!: ICompetition;

  public RankingTypes = RankingType;
  rankingType: RankingType = RankingType.MALE;
  ranking: IRank[] = [];

  activeTab: CompetitionResultsAndRankingsTabs = CompetitionResultsAndRankingsTabs.RESULTS;
  CompetitionResultsAndRankingsTabs = CompetitionResultsAndRankingsTabs;

  constructor()
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
    return this.Competition.State !== CompetitionStateType.DRAFT;
  }
}

enum CompetitionResultsAndRankingsTabs {
  RESULTS = 0,
  RANKINGS = 1
}
