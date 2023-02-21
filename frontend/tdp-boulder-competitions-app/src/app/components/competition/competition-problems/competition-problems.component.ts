import { Component, Input, OnInit } from '@angular/core';
import { IBoulderProblem } from '../../../models/competitions.models';
import { ProblemsService } from '../../../services/problems.service';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  BoulderProblems: IBoulderProblem[] = [];
  @Input() CompetitionId: number | undefined;

  CompetitionsUtils = CompetitionsUtils;

  constructor(private problemsService: ProblemsService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadProblems();

    this.problemsService.problemsUpdatedObservable$.subscribe(() => {
      this.LoadProblems();
    }); 
  }

  private LoadProblems = async (): Promise<void> => {
    this.BoulderProblems = await this.problemsService.GetByCompetitionId(this.CompetitionId!);
  }
}
