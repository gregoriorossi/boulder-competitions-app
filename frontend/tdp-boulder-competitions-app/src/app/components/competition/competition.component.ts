import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IBoulderProblem, ICompetitionAthlete, ICompetitionDetails } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competition: ICompetitionDetails | undefined;

  constructor(private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competition = await this.competitionsService.GetCompetition();
  }

  IsProblemSent = (athlete: ICompetitionAthlete, problem: IBoulderProblem): boolean => {
    return athlete.BoulderProblemsSent.indexOf(problem.Id) > -1;
  }

  ShowAthleteLabel = (athlete: ICompetitionAthlete): string => {
    const birthDate = moment(athlete.BirthDate).format('DD-MM-YYYY');
    return `${athlete.Surname} ${athlete.Name} (${birthDate})`;
  }

  CalculateScore = (athlete: ICompetitionAthlete): number => {
    return athlete.BoulderProblemsSent.length;
  }
}
