import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionDetails } from '../../../models/competitions.models';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  @Input() competition: ICompetitionDetails | undefined;

  CompetitionsUtils = CompetitionsUtils;

  constructor() { }

  ngOnInit(): void {
  }

}
