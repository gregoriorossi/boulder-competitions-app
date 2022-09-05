import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';
import { CompetitionsUtils } from '../../utils/competitions.utils';
import { Router } from '@angular/router';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  CompetitionsUtils = CompetitionsUtils;
  DateUtils = DateUtils;

  competitions: ICompetition[] = [];

  constructor(
    private router: Router,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competitions = await this.competitionsService.GetCompetitions();
  }

  OnViewCompetitionClick = (competition: ICompetition) => {
    this.router.navigate(['/gare', competition.Id]);
  }
}
