import { Component, Input, OnInit } from '@angular/core';
import { Gender, IAthlete } from '../../../models/athletes.models';
import { ICompetition } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { DialogsService } from '../../../services/dialogs.service';
import { ToastService } from '../../../services/toast.service';
import { CompetitionsUtils } from '../../../utils/competitions.utils';
import { DateUtils } from '../../../utils/date.utils';

@Component({
  selector: 'app-competition-athletes',
  templateUrl: './competition-athletes.component.html',
  styleUrls: ['./competition-athletes.component.scss']
})
export class CompetitionAthletesComponent implements OnInit {

  @Input() Competition!: ICompetition;
  DateUtils = DateUtils;

  athletes: IAthlete[] = [];

  CompetitionsUtils = CompetitionsUtils;

  constructor(private competitionsService: CompetitionsService,
    private toastService: ToastService,
    private dialogsService: DialogsService) { }

  async ngOnInit(): Promise<void> {
    await this.LoadAthletes();

    this.competitionsService.athleteRegisteredToCompetition.subscribe(async (athlete) => {
      await this.LoadAthletes();
    });
  }

  get totalAthletesNumber(): number {
    return this.athletes.length;
  }

  get totalMinorAthletes(): number {
    return this.athletes.filter(a => a.IsMinor).length;
  }

  GetGenderCellClass = (gender: Gender): string => {
    return gender === Gender.MALE ? "fa-mars" : "fa-venus";
  }

  GetGenderRowClass = (gender: Gender): string => {
    return gender === Gender.FEMALE ? "female-row" : "male-row";
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

  OnDownloadButtonClick = async (): Promise<void> => {
    await this.competitionsService.DownloadAthletes(this.Competition.Id);
  }

  OnSendEmailClick = async (athlete: IAthlete): Promise<void> => {
    const result = await this.competitionsService.SendRegistrationEmail(this.Competition.Id, athlete.Email);

    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess(`Email inviata a ${athlete.Name} ${athlete.Surname} con successo`);
    } else {
      this.toastService.showDanger(`Errore nell'invio della email a ${athlete.Name} ${athlete.Surname}`);
    }
  }

  OnDownloadConsentClick = (athlete: IAthlete): void => {
    this.competitionsService.DownloadConsent(this.Competition.Id, athlete.Id);
  }

  OnDownloadAllConsentsClick = (): void => {
    this.competitionsService.DownloadAllConsents(this.Competition.Id);
  }

  GetMinorCellClass = (isMinor: boolean) => {
    return isMinor ? "fa-check" : "";
  }

  GetName = (athlete: IAthlete): string => {
    return athlete.IsMinor
      ? `${athlete.Name} (Tutor ${athlete.TutorName} ${athlete.TutorSurname})`
      : athlete.Name;
  }

  private LoadAthletes = async () => {
    this.athletes = await this.competitionsService.GetAthletes(this.Competition.Id);
  }

  private DeleteAthlete = async (athlete: IAthlete) => {
    const athleteFullName: string = `${athlete.Name} ${athlete.Surname}`;
    const result = await this.competitionsService.DeleteRegistrationToCompetition(this.Competition.Id, athlete.Id);
    if (result === StatusTypes.OK) {
      this.toastService.showSuccess(`${athleteFullName} cancellato con successo`);
    } else {
      this.toastService.showDanger(`Errore nella cancellazione di ${athleteFullName}`);
    }

    await this.LoadAthletes();
  }
}
