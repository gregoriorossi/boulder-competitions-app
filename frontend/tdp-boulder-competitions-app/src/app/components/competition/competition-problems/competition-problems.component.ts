import { Component, Input, OnInit } from '@angular/core';
import { IBoulderProblem } from '../../../models/competitions.models';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  @Input() BoulderProblems: IBoulderProblem[] | undefined;

  CompetitionsUtils = CompetitionsUtils;

  constructor() { }

  ngOnInit(): void {
  }

}
