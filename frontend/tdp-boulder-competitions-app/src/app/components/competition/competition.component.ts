import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionStateType, ICompetitionDetails } from '../../models/competitions.models';
import { IResponse, StatusTypes } from '../../models/services.models';
import { CompetitionsService } from '../../services/competitions.service';
import { DialogsService } from '../../services/dialogs.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competition!: ICompetitionDetails | void;
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.ATHLETES;
  CompetitionComponentTabs = CompetitionComponentTabs;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private dialogsService: DialogsService) { }

  async ngOnInit(): Promise<void> {
    this.activetedRoute.params.subscribe(async params => {
      const id: number = Number.parseInt(params['id']);
      this.competition = await this.competitionsService.GetCompetition(id);
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

    this.dialogsService.Confirm(message, confirmFn, () => { })
  }

  IsStartButtonVisible = (): boolean => {
    return this.competition!.State === CompetitionStateType.DRAFT;
  }

  IsCloseButtonVisible = (): boolean => {
    return this.competition!.State === CompetitionStateType.ONGOING;
  }

  private DeleteCompetition = async (): Promise<void> => {
    const result: IResponse = await this.competitionsService.DeleteCompetition(this.competition!.Id);

    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess("Gara cancellata correttamente");
      this.router.navigate(["/"]);
    } else {
      this.toastService.showDanger("Errore nella cancellazione della gara");
      console.log(result);
    }
  }
}

enum CompetitionComponentTabs {
  ATHLETES = 0,
  RANKINGS = 1,
  PROBLEMS = 2
}
