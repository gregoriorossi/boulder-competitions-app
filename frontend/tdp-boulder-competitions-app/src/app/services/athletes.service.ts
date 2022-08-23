import { Injectable } from '@angular/core';
import { Gender, IAthlete } from '../models/athletes.models';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  constructor() { }

  public GetAthletes(): Promise<IAthlete[]> {
    return Promise.resolve([
      { Name: "John", Surname: "Doe", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE },
      { Name: "Jane", Surname: "Doe", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE },
      { Name: "Mario", Surname: "Rossi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE },
    ]);
  }
}
