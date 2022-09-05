import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompetitionDetails } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competition!: ICompetitionDetails | void;
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.ATHLETES;
  CompetitionComponentTabs = CompetitionComponentTabs;

  constructor(
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.activetedRoute.params.subscribe(async params => {
      const id: number = Number.parseInt(params['id']);
      this.competition = await this.competitionsService.GetCompetition(id);
    });
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
  ATHLETES = 0,
  RANKINGS = 1,
  PROBLEMS = 2
}
