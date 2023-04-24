import { Component, Input, OnInit } from "@angular/core";
import { CompetitionStateType, IAthlete, ICompetitionInfo, IProblem, IProblemsGroupColor } from "../../../models/competitions.models";
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

  OnProblemChange = async ($event: any, problem: IProblem): Promise<void> => {

    try {
      const isSent = $event.target.checked;
      await this.problemsService.SetSent(this.Competition.Id, problem.Id, this.Athlete.Id, isSent);
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
