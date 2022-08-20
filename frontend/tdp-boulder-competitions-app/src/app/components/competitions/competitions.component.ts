import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CompetitionStateType, ICompetition } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';
import { CompetitionsUtils } from '../../utils/competitions.utils';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  CompetitionsUtils = CompetitionsUtils;

  competitions: ICompetition[] = [];

  constructor(private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competitions = await this.competitionsService.GetCompetitions();
  }

  FormatDate = (date: Date): string => {
    return moment(date).format("DD-MM-YYYY");
  }
}
