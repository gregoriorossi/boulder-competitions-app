import { Component, OnInit } from '@angular/core';
import { IAthlete } from '../../../models/athletes.models';
import { IRankingRow } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';

@Component({
  selector: 'app-competition-rankings',
  templateUrl: './competition-rankings.component.html',
  styleUrls: ['./competition-rankings.component.scss']
})
export class CompetitionRankingsComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService)
  { }

  ranking: IRankingRow[] = [];

  async ngOnInit(): Promise<void> {
    const competitionId: number = 1;
    this.ranking = await this.competitionsService.GetRanking(competitionId);
  }

}
