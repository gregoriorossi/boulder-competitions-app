import { Component, Input, OnInit } from "@angular/core";
import { CompetitionStateType, IAthlete, ICompetitionInfo } from "../../../models/competitions.models";
import { IProblem, IProblemsGroupColor } from "../../../models/problems.models";
import { StatusTypes } from "../../../models/services.models";
import { CompetitionsService } from "../../../services/competitions.service";
import { ProblemsService } from "../../../services/problems.service";
import { ToastService } from "../../../services/toast.service";
import { ColorsUtils } from "../../../utils/colors.utils";
import { DateUtils } from "../../../utils/date.utils";

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitonProblemsComponent implements OnInit {

  @Input() Athlete!: IAthlete;
  @Input() Competition!: ICompetitionInfo;

  protected ProblemsGroups: IProblemsGroupColor[] = [];
  protected SpecialProblems: IProblem[] = [];

  constructor(private competitionsService: CompetitionsService,
    private problemsService: ProblemsService,
    private toastService: ToastService) { }


  async ngOnInit(): Promise<void> {
    await this.LoadResults();
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssCByColor(color);
  }

  get AreProblemsDisabled(): boolean {
    return this.Competition.State !== CompetitionStateType.ONGOING;
  }

  PrintScore = (problem: IProblem): string => {
    if (this.Competition.State === CompetitionStateType.DRAFT) {
      return "";
    }

    return `(${problem.Score}pt)`;
  }

  OnProblemChange = async ($event: any, problem: IProblem): Promise<void> => {
    
    try {
      const isSent = $event.target.checked;
      const result = await this.problemsService.SetSent(this.Competition.Id, problem.Id, this.Athlete.Id, this.Athlete.Gender, isSent);

      if (result.Status === StatusTypes.ERR_COMPETITION_NOT_ONGOING) {
        this.toastService.showDanger('Non è possibile effettuare modifiche se la gara non è in corso');
      }

      await this.LoadResults();
    } catch (err) { 
      console.log(err);
      this.toastService.showDanger("Errore, riprovare più tardi");
      await this.LoadResults();
    }
  }

  GetShortSendDateTime = (dateStr: string) => {
    const date = DateUtils.ParseDate(dateStr, "YYYY-MM-DD HH:mm:ss");
    return date.isValid() ? `(${date.format('HH:mm:ss')})` : '';
  }

  private LoadResults = async (): Promise<void> => {
    const result = await this.competitionsService.GetResultsByAthleteId(this.Competition.Id, this.Athlete.Id);
    this.ProblemsGroups = result.ProblemGroups;
    this.SpecialProblems = result.SpecialProblems;
  }
}
