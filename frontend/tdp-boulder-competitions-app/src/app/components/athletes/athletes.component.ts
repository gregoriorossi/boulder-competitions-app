import { Component, OnInit } from '@angular/core';
import { Gender, IAthlete } from '../../models/athletes.models';
import { AthletesService } from '../../services/athletes.service';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {

  DateUtils = DateUtils;

  athletes: IAthlete[] = [];

  constructor(private athletesService: AthletesService) { }

  async ngOnInit(): Promise<void> {
    this.athletes = await this.athletesService.GetAthletes();
  }

  GetGenderClass = (gender: Gender): string => {
    return gender === Gender.MALE ? "fa-mars" : "fa-venus";
  }

  
}
