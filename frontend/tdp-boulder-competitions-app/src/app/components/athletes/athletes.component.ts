import { Component, OnInit } from '@angular/core';
import { Gender, IAthlete } from '../../models/athletes.models';
import { StatusTypes } from '../../models/services.models';
import { AthletesService } from '../../services/athletes.service';
import { CompetitionsService } from '../../services/competitions.service';
import { DialogsService } from '../../services/dialogs.service';
import { ToastService } from '../../services/toast.service';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {

  DateUtils = DateUtils;

  athletes: IAthlete[] = [];

  constructor(private competitionsService: CompetitionsService,
    private athletesService: AthletesService,
    private toastService: ToastService,
    private dialogsService: DialogsService)
  { }

  async ngOnInit(): Promise<void> {
    this.athletes = await this.competitionsService.GetAthletes();
  }

  GetGenderClass = (gender: Gender): string => {
    return gender === Gender.MALE ? "fa-mars" : "fa-venus";
  }

  OnEditAthleteClick = (athlete: IAthlete) => {
    console.log(athlete);
  }

  OnDeleteAthleteClick = async (athlete: IAthlete): Promise<void> => {
    const message = `Cancellare ${athlete.Name} ${athlete.Surname}?`;
    const confirmFn = async () => {
      await this.DeleteAthlete(athlete);
    }

    this.dialogsService.Confirm(message, "", "Conferma", "Annulla", confirmFn, () => { })
  }

  private DeleteAthlete = async (athlete: IAthlete) => {
    const result = await this.athletesService.DeleteAthlete(athlete);
    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess(`${athlete.Name} ${athlete.Surname} cancellato con successo`);
    } else {
      this.toastService.showDanger(`Errore nella cancellazione dell'atleta`);
      console.log(result);
    }
  }
}
