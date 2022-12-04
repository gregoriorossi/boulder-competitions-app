import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Gender } from '../../../models/athletes.models';
import { IBoulderProblem, ICompetitionAthlete, ICompetitionDetails } from '../../../models/competitions.models';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-athletes',
  templateUrl: './competition-athletes.component.html',
  styleUrls: ['./competition-athletes.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  @Input() competition: ICompetitionDetails | undefined;
  @Input() BoulderProblems: IBoulderProblem[] | undefined;

  CompetitionsUtils = CompetitionsUtils;

  constructor() { }

  ngOnInit(): void {
  }

  ShowAthleteLabel = (athlete: ICompetitionAthlete): string => {
    const birthDate = moment(athlete.BirthDate).format('DD-MM-YYYY');
    return `${athlete.Surname} ${athlete.Name} (${birthDate})`;
  }

  IsProblemSent = (athlete: ICompetitionAthlete, problem: IBoulderProblem): boolean => {
    return athlete.BoulderProblemsSent.indexOf(problem.id) > -1;
  }

  CalculateScore = (athlete: ICompetitionAthlete, boulderProblems: IBoulderProblem[]): number => {
    return athlete.BoulderProblemsSent.reduce((prev, current) => {
      const currBoulder = boulderProblems.find(p => p.id === current);
      if (currBoulder) {
        return prev + currBoulder.difficulty;
      }

      return prev;
    }, 0);
  }

  GetGenderClass = (gender: Gender): string => {
    return gender === Gender.FEMALE ? "female-row" : "male-row";
  }
}
