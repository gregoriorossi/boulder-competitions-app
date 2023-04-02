import { Component, Input, OnInit } from '@angular/core';
import { IProblemsGroupColor } from '../../../models/competitions.models';
import { ProblemsService } from '../../../services/problems.service';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  ProblemGroups: IProblemsGroupColor[] = [];
  @Input() CompetitionId!: number;

  CompetitionsUtils = CompetitionsUtils;

  constructor(private problemsService: ProblemsService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadProblems();

    this.problemsService.problemsUpdatedObservable$.subscribe(async () => {
      await this.LoadProblems();
    }); 
  }

  private LoadProblems = async (): Promise<void> => {
    this.ProblemGroups = await this.problemsService.GetByCompetitionId(this.CompetitionId!);
  }

  OnProblemEdited = async (): Promise<void> => {
    await this.LoadProblems();
  }
}
