import { Component, OnInit } from '@angular/core';
import { ICompetitionDetails } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competition: ICompetitionDetails | undefined;
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.RESULTS;
  CompetitionComponentTabs = CompetitionComponentTabs;

  constructor(private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competition = await this.competitionsService.GetCompetition();
  }

  OnTabClick = (tabType: CompetitionComponentTabs): void => {
    this.activeTab = tabType;
  }

  IsTabContentVisible = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab;
  }

  TabActiveClass = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab ? "active" : "";
  }
}

enum CompetitionComponentTabs {
  RESULTS = 1,
  PROBLEMS = 2
}
