import { Component, Input, OnInit } from '@angular/core';
import { ICompetition, IProblem, IProblemsGroupColor } from '../../../models/competitions.models';
import { ProblemsService } from '../../../services/problems.service';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitionProblemsComponent implements OnInit {

  ProblemGroups: IProblemsGroupColor[] = [];
  SpecialProblems: IProblem[] = [];
  @Input() Competition!: ICompetition;

  CompetitionsUtils = CompetitionsUtils;

  constructor(private problemsService: ProblemsService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadProblems();

    this.problemsService.problemsUpdatedObservable$.subscribe(async () => {
      await this.LoadProblems();
    }); 
  }

  private LoadProblems = async (): Promise<void> => {
    const result = await this.problemsService.GetByCompetitionId(this.Competition.Id!);
    this.ProblemGroups = result.ColorGroups;
    this.SpecialProblems = result.SpecialProblems;

  }

  OnProblemEdited = async (): Promise<void> => {
    await this.LoadProblems();
  }
}
