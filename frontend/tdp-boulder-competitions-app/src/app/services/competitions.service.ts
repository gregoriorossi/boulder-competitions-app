import { Injectable } from '@angular/core';
import { CompetitionStateType, ICompetition } from '../models/competitions.models';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor() { }

  public GetCompetitions(): Promise<ICompetition[]> {
    return Promise.resolve([
      { Title: "Gara di Pasqua 2020", Date: new Date(2020, 3, 1), State: CompetitionStateType.DRAFT },
      { Title: "Gara di Natale 2019", Date: new Date(2019, 11, 22), State: CompetitionStateType.CLOSED  },
      { Title: "Gara di inizio anno", Date: new Date(2019, 8, 11), State: CompetitionStateType.ONGOING  }
    ]);
  }
}
