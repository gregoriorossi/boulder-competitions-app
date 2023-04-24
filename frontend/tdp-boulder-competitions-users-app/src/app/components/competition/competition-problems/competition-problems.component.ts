import { Component, Input, OnInit } from "@angular/core";
import { CompetitionStateType, IAthlete, ICompetitionInfo } from "../../../models/competitions.models";
import { IProblem, IProblemsGroupColor } from "../../../models/problems.models";
import { StatusTypes } from "../../../models/services.models";
import { CompetitionsService } from "../../../services/competitions.service";
import { ProblemsService } from "../../../services/problems.service";
import { ToastService } from "../../../services/toast.service";
import { ColorsUtils } from "../../../utils/colors.utils";

@Component({
  selector: 'app-competition-problems',
  templateUrl: './competition-problems.component.html',
  styleUrls: ['./competition-problems.component.scss']
})
export class CompetitonProblemsComponent implements OnInit {

  @Input() Athlete!: IAthlete;
  @Input() Competition!: ICompetitionInfo;

  protected ProblemsGroups: IProblemsGroupColor[] = [];

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
      const result = await this.problemsService.SetSent(this.Competition.Id, problem.Id, this.Athlete.Id, isSent);

      if (result.Status === StatusTypes.ERR_COMPETITION_NOT_ONGOING) {
        this.toastService.showDanger('Non è possibile effettuare modifiche se la gara non è in corso');
        await this.LoadResults();
      }
    } catch (err) {
      console.log(err);
      this.toastService.showDanger("Errore, riprovare più tardi");
      await this.LoadResults();
    }
  }

  private LoadResults = async (): Promise<void> => {
    this.ProblemsGroups = await this.competitionsService.GetResultsByAthleteId(this.Competition.Id, this.Athlete.Id);
  }
}
