import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IBoulderProblem, ICompetitionAthlete, ICompetitionDetails } from '../../../models/competitions.models';

@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  @Input() competition: ICompetitionDetails | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.competition);
  }

  ShowAthleteLabel = (athlete: ICompetitionAthlete): string => {
    const birthDate = moment(athlete.BirthDate).format('DD-MM-YYYY');
    return `${athlete.Surname} ${athlete.Name} (${birthDate})`;
  }

  IsProblemSent = (athlete: ICompetitionAthlete, problem: IBoulderProblem): boolean => {
    return athlete.BoulderProblemsSent.indexOf(problem.Id) > -1;
  }

  CalculateScore = (athlete: ICompetitionAthlete): number => {
    return athlete.BoulderProblemsSent.length;
  }
}
