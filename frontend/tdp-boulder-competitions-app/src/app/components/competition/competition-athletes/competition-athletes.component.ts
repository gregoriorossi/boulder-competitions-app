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
    private dialogsService: DialogsService)
  { }

  async ngOnInit(): Promise<void> {
    console.log(this.Competition);
    await this.LoadAthletes();

    this.competitionsService.athleteRegisteredToCompetition.subscribe(async (athlete) => {
      await this.LoadAthletes();
    });
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
    
    //const blob: Blob = new Blob([data], { type: "application/xlsx" });

    //var downloadURL = window.URL.createObjectURL(data);
    //var link = document.createElement('a');
    //link.href = downloadURL;
    //link.download = "help.pdf";
    //link.click();
  }

  OnSendEmailClick = (athlete: IAthlete): void => {
    alert('Sending email to ' + athlete.Name + " " + athlete.Surname);
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
