import { Injectable } from '@angular/core';
import { Gender } from '../models/athletes.models';
import { CompetitionStateType, ICompetition, ICompetitionDetails, BoulderProblemsColors } from '../models/competitions.models';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor() { }

  public GetCompetitions(): Promise<ICompetition[]> {
    return Promise.resolve([
      { Title: "Gara di Pasqua 2020", Date: new Date(2020, 3, 1), State: CompetitionStateType.DRAFT },
      { Title: "Gara di Natale 2019", Date: new Date(2019, 11, 22), State: CompetitionStateType.CLOSED },
      { Title: "Gara di inizio anno", Date: new Date(2019, 8, 11), State: CompetitionStateType.ONGOING }
    ]);
  }

  public GetCompetition(): Promise<ICompetitionDetails> {
    return Promise.resolve(
      {
        Title: "Gara di Pasqua 2020",
        Date: new Date(2020, 3, 1),
        State: CompetitionStateType.DRAFT,
        BoulderProblems: [
          { Id: 1, Title: "1", Color: BoulderProblemsColors.WHITE, Score: 1 },
          { Id: 2, Title: "2", Color: BoulderProblemsColors.WHITE, Score: 1 },
          { Id: 3, Title: "3", Color: BoulderProblemsColors.WHITE, Score: 1 },
          { Id: 4, Title: "1", Color: BoulderProblemsColors.BLUE, Score: 2 },
          { Id: 5, Title: "2", Color: BoulderProblemsColors.BLUE, Score: 2 },
          { Id: 6, Title: "1", Color: BoulderProblemsColors.GREEN, Score: 3 },
          { Id: 7, Title: "1", Color: BoulderProblemsColors.YELLOW, Score: 4 },
          { Id: 8, Title: "2", Color: BoulderProblemsColors.YELLOW, Score: 4 },
          { Id: 9, Title: "1", Color: BoulderProblemsColors.RED, Score: 5 },
          { Id: 10, Title: "2", Color: BoulderProblemsColors.RED, Score: 5 },
          { Id: 11, Title: "3", Color: BoulderProblemsColors.RED, Score: 5 },
          { Id: 12, Title: "1", Color: BoulderProblemsColors.BLACK, Score: 6 },
        ],
        Athletes: [
          { Name: 'John', Surname: 'Doe', BirthDate: new Date(1990, 10, 12), Gender: Gender.MALE, BoulderProblemsSent: [1, 6, 12] },
          { Name: 'Jane', Surname: 'Doe', BirthDate: new Date(1970, 10, 12), Gender: Gender.FEMALE, BoulderProblemsSent: [2, 5, 10, 11] },
        ]
      }
    )
  }
}
