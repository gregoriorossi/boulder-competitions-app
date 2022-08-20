import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionDetails } from '../../../models/competitions.models';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  @Input() competition: ICompetitionDetails | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
