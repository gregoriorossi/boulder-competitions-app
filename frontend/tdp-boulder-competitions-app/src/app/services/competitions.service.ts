import { Injectable } from '@angular/core';
import { Gender, IAthlete } from '../models/athletes.models';
import { CompetitionStateType, ICompetition, ICompetitionDetails, BoulderProblemsColors, IAddCompetitionRequest, IRankingRow } from '../models/competitions.models';
import { IResponse, StatusTypes } from '../models/services.models';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor() { }

  public GetCompetitions(): Promise<ICompetition[]> {
    return Promise.resolve([
      { Id: 1, Title: "Gara di Pasqua 2020", Date: new Date(2020, 3, 1), State: CompetitionStateType.DRAFT },
      { Id: 2, Title: "Gara di Natale 2019", Date: new Date(2019, 11, 22), State: CompetitionStateType.CLOSED },
      { Id: 3, Title: "Gara di inizio anno", Date: new Date(2019, 8, 11), State: CompetitionStateType.ONGOING }
    ]);
  }

  public async GetCompetition(id: number): Promise<ICompetitionDetails | void> {
    const competitions: ICompetition[] = await this.GetCompetitions();
    const competition: ICompetition | undefined = competitions.find(c => c.Id === id);

    if (competition) {
      return Promise.resolve(
        {
          Id: 1,
          Title: competition.Title,
          Date: competition.Date,
          State: competition.State,
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

    return Promise.resolve();
  }

  public AddCompetition(request: IAddCompetitionRequest): Promise<IResponse> {
    return Promise.resolve({
      Status: StatusTypes.OK
    });
  }

  public GetRanking(competitionId: number): Promise<IRankingRow[]> {
    return Promise.resolve([
      { Position: 1, Athlete: { Name: "John", Surname: "Doe", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE }, Score: 1000 },
      { Position: 2, Athlete: { Name: "Jane", Surname: "Doe", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE }, Score: 850 },
      { Position: 3, Athlete: { Name: "Mario", Surname: "Rossi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE }, Score: 665 },
      { Position: 4, Athlete: { Name: "Luca", Surname: "Bianchi", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE }, Score: 600 },
      { Position: 5, Athlete: { Name: "Gianni", Surname: "Reve", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE }, Score: 222 },
      { Position: 6, Athlete: { Name: "Carlo", Surname: "Marzi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE }, Score: 111 },
    ]);
  }

  public DeleteCompetition(competitionId: number): Promise<IResponse> {
    return Promise.resolve({
      Status: StatusTypes.OK
    });
  }
}
