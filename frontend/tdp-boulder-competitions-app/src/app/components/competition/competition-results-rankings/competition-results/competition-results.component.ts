import { Component, Input, OnInit } from "@angular/core";
import { IAthlete } from "../../../../models/athletes.models";
import { CompetitionStateType, ICompetition, ICompetitionResult, IProblem, IProblemsGroupColor } from "../../../../models/competitions.models";
import { CompetitionsService } from "../../../../services/competitions.service";
import { DialogsService } from "../../../../services/dialogs.service";
import { ProblemsService } from "../../../../services/problems.service";
import { ToastService } from "../../../../services/toast.service";
import { ColorsUtils } from "../../../../utils/colors.utils";
import { DateUtils } from "../../../../utils/date.utils";

enum ResultsTypes {
  ALL = "ALL",
  MALE = "MALE",
  FEMALE = "FEMALE"
}

@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {
  public ResultsTypes = ResultsTypes;
  resultType: ResultsTypes = ResultsTypes.ALL;

  @Input() Competition!: ICompetition;

  CompetitionResults: ICompetitionResult[] = [];

  constructor(
    private competitionsService: CompetitionsService,
    private problemsService: ProblemsService,
    private toastService: ToastService,
    private dialogsService: DialogsService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadResults();
  }

  get Header(): IHeader {
    return {
      ProblemsGroups: this.CompetitionResults[0].ProblemsGroups,
      SpecialProblems: this.CompetitionResults[0].SpecialProblems
    };
  }

  OnResultTypeChange = async (e: any): Promise<void> => {
    await this.LoadResults();
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssByColor(color);
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

  get IsCompetitionClosed(): boolean {
    return this.Competition.State === CompetitionStateType.CLOSED;
  }

  OnRefreshClick = async (): Promise<void> => {
    await this.LoadResults();
  }

  GetShortSendDateTime = (dateStr: string) => {
    const date = DateUtils.ParseDate(dateStr, "YYYY-MM-DD HH:mm:ss");
    return date.isValid() ? `${date.format('HH:mm:ss')}` : '';
  }

  private LoadResults = async (): Promise<void> => {
    const results: ICompetitionResult[] = await this.competitionsService.GetResults(this.Competition.Id);
    this.CompetitionResults = results.filter(r => {
      return this.resultType === ResultsTypes.ALL || (r.Athlete.Gender as string) === this.resultType;
    });
  }
}

interface IHeader {
  ProblemsGroups: IProblemsGroupColor[];
  SpecialProblems: IProblem[];
}
