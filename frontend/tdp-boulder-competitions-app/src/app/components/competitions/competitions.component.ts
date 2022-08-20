import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICompetition } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';
import { CompetitionsUtils } from '../../utils/competitions.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  CompetitionsUtils = CompetitionsUtils;

  competitions: ICompetition[] = [];

  constructor(
    private router: Router,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competitions = await this.competitionsService.GetCompetitions();
  }

  OnViewCompetitionClick = (competition: ICompetition) => {
    this.router.navigateByUrl('/gara');
  }

  FormatDate = (date: Date): string => {
    return moment(date).format("DD-MM-YYYY");
  }
}
