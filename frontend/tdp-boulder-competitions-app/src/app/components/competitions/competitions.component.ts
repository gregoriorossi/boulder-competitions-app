import { Component, OnInit, PipeTransform } from '@angular/core';
import { CompetitionStateType, ICompetition } from '../../models/competitions.models';
import { CompetitionsService } from '../../services/competitions.service';
import { Router } from '@angular/router';
import { DateUtils } from '../../utils/date.utils';
import { ToastService } from '../../services/toast.service';
import { DialogsService } from '../../services/dialogs.service';
import { IResponse, StatusTypes } from '../../models/services.models';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  DateUtils = DateUtils;

  competitions: ICompetition[] = [];
  textFilter = new FormControl('', { nonNullable: true });
  //textFilterObservable$!: Observable<ICompetition[]>;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private dialogsService: DialogsService,
    private competitionsService: CompetitionsService) { }

  async ngOnInit(): Promise<void> {
    this.competitions = await this.competitionsService.GetCompetitions();
  }

  OnViewCompetitionClick = (competition: ICompetition) => {
    this.router.navigate(['/gare', competition.id]);
  }

  IsViewButtonVisible = (state: CompetitionStateType): boolean => {
    return state === CompetitionStateType.CLOSED;
  }

  IsEditButtonVisible = (state: CompetitionStateType): boolean => {
    return state === CompetitionStateType.ONGOING || state === CompetitionStateType.DRAFT;
  }

  OnDeleteCompetitionClick = async (competitionId: number): Promise<void> => {
    const message = `Cancellare la gara?`;
    const confirmFn = async () => {
      await this.DeleteCompetition(competitionId);
    }

    this.dialogsService.Confirm(message, confirmFn, () => { })
  }

  onSort(event: any) {
    console.log("sort");
    console.log(event);

  }

  private DeleteCompetition = async (competitionId: number): Promise<void> => {
    const result: IResponse = await this.competitionsService.DeleteCompetition(competitionId);

    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess("Gara cancellata correttamente");
      this.router.navigate(["/"]);
    } else {
      this.toastService.showDanger("Errore nella cancellazione della gara");
      console.log(result);
    }
  }
}
