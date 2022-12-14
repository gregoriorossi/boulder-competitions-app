import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionStateType, IBoulderProblem, ICompetitionDetails } from '../../models/competitions.models';
import { StatusTypes } from '../../models/services.models';
import { CompetitionsService } from '../../services/competitions.service';
import { DialogsService } from '../../services/dialogs.service';
import { ProblemsService } from '../../services/problems.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competition!: ICompetitionDetails | void;
  competitionId: number = 0;
  boulderProblems: IBoulderProblem[] = [];
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.ATHLETES;
  CompetitionComponentTabs = CompetitionComponentTabs;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private dialogsService: DialogsService,
    private problemsService: ProblemsService)
  { }

  async ngOnInit(): Promise<void> {
    this.activetedRoute.params.subscribe(async params => {
      this.competitionId = Number.parseInt(params['id']);
      this.LoadCompetition();
    });
  }

  OnTabClick = (tabType: CompetitionComponentTabs): void => {
    this.activeTab = tabType;
  }

  IsTabContentVisible = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab;
  }

  TabActiveClass = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab ? "active" : "";
  }

  OnDeleteCompetitionClick = async (): Promise<void> => {
    const message = `Cancellare la gara?`;
    const confirmFn = async () => {
      await this.DeleteCompetition();
    }

    this.dialogsService.Confirm(message, "Tutti i dati verranno cancellati", "Conferma", "Annulla", confirmFn, () => { });
  }

  OnCloseCompetitionButtonClick = async (): Promise<void> => {
    const message = `Terminare la gara?`;
    const confirmFn = async () => {
      await this.SetCompetitionState(CompetitionStateType.CLOSED);
    }

    this.dialogsService.Confirm(message, "Non sar?? pi?? possibile modificare i blocchi o iscriversi per gli atleti", "Conferma", "Annulla", confirmFn, () => { });
  }

  OnStartCompetitionButtonClick = async (): Promise<void> => {
    const message = `Iniziare la gara?`;
    const confirmFn = async () => {
      await this.SetCompetitionState(CompetitionStateType.ONGOING);
    }

    this.dialogsService.Confirm(message, "Da ora i partecipanti potranno registrare i blocchi", "Conferma", "Annulla", confirmFn, () => { });
  }

  IsStartButtonVisible = (): boolean => {
    return this.competition!.state === CompetitionStateType.DRAFT;
  }

  IsCloseButtonVisible = (): boolean => {
    return this.competition!.state === CompetitionStateType.ONGOING;
  }

  private DeleteCompetition = async (): Promise<void> => {

    const result: StatusTypes = await this.competitionsService.DeleteCompetition(this.competition!.id);

    if (result === StatusTypes.OK) {
      this.toastService.showSuccess("Gara cancellata correttamente");
      this.router.navigate(["/"]);
    } else {
      this.toastService.showDanger("Errore nella cancellazione della gara");
      console.log(result);
    }
  }

  private SetCompetitionState = async (state: CompetitionStateType): Promise<void> => {

    const result: StatusTypes = await this.competitionsService.SetState(this.competition!.id, state);

    if (result === StatusTypes.OK) {
      this.toastService.showSuccess("Gara modificata correttamente");
      this.LoadCompetition()
    } else {
      this.toastService.showDanger("Errore nella modifica della gara");
      console.log(result);
    }
  }

  private LoadCompetition = async (): Promise<void> => {
    this.competition = await this.competitionsService.GetCompetition(this.competitionId);
    this.boulderProblems = await this.problemsService.GetByCompetitionId(this.competitionId);
  }


}

enum CompetitionComponentTabs {
  ATHLETES = 0,
  RANKINGS = 1,
  PROBLEMS = 2
}
