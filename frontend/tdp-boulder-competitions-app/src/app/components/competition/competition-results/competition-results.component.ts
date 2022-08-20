import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Gender } from '../../../models/athletes.models';
import { IBoulderProblem, ICompetitionAthlete, ICompetitionDetails } from '../../../models/competitions.models';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  @Input() competition: ICompetitionDetails | undefined;
  CompetitionsUtils = CompetitionsUtils;

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

  CalculateScore = (athlete: ICompetitionAthlete, boulderProblems: IBoulderProblem[]): number => {
    return athlete.BoulderProblemsSent.reduce((prev, current) => {
      const currBoulder = boulderProblems.find(p => p.Id === current);
      if (currBoulder) {
        return prev + currBoulder.Score;
      }

      return prev;
    }, 0);
  }

  GetGenderClass = (gender: Gender): string => {
    return gender === Gender.FEMALE ? "female-row" : "male-row";
  }
}
