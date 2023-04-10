import { Component, Input, OnInit } from "@angular/core";
import { IAthlete } from "../../../../models/athletes.models";
import { ICompetition, ICompetitionResult, IProblem, IProblemsGroupColor } from "../../../../models/competitions.models";
import { CompetitionsService } from "../../../../services/competitions.service";
import { ProblemsService } from "../../../../services/problems.service";
import { ToastService } from "../../../../services/toast.service";
import { ColorsUtils } from "../../../../utils/colors.utils";


@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  @Input() Competition!: ICompetition;

  CompetitionResults: ICompetitionResult[] = [];
  
  constructor(
    private competitionsService: CompetitionsService,
    private problemsService: ProblemsService,
    private toastService: ToastService)
  {}

  async ngOnInit(): Promise<void> {
    await this.LoadResults();
  }

  get Header(): IProblemsGroupColor[] {
    return this.CompetitionResults[0].ProblemsGroups;
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssCByColor(color);
  }

  OnProblemClick = async (problem: IProblem, athlete: IAthlete): Promise<void> => {
    try {
      const sent = !problem.Sent;
      await this.problemsService.SetSentStateToProblem(problem.CompetitionId, problem.Id, athlete.Id, sent);
    } catch (err) {
      console.log(err);
      this.toastService.showDanger("Errore, il servizio non funziona");
    } finally {
      await this.LoadResults();
    }
  }

  private LoadResults = async (): Promise<void> => {
    this.CompetitionResults = await this.competitionsService.GetResults(this.Competition.Id);
  }
}
