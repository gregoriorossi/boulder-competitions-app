import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender, IAthlete } from '../../../models/athletes.models';
import { IRegisterToCompetitionRequest } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { ToastService } from '../../../services/toast.service';
import { DateUtils } from '../../../utils/date.utils';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-athlete-form',
  templateUrl: './edit-athlete-form.component.html',
  styleUrls: ['./edit-athlete-form.component.scss']
})
export class EditAthleteFormComponent implements OnInit {

  @Output() AthleteUpdated = new EventEmitter<IAthlete>();
  @Input() Athlete!: IAthlete;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  Gender = Gender;

  constructor(
    private competitionsService: CompetitionsService,
    private toastService: ToastService) { }

  ngOnInit(): void {

    const date = moment(this.Athlete.BirthDate).toDate();

    this.form = new FormGroup({
      Name: new FormControl(this.Athlete.Name, [Validators.required]),
      Surname: new FormControl(this.Athlete.Surname, [Validators.required]),
      Email: new FormControl(this.Athlete.Email, [Validators.required, Validators.email]),
      BirthDate: new FormControl({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }, [Validators.required]),
      Telephone: new FormControl(this.Athlete.Telephone, [Validators.required]),
      Gender: new FormControl(this.Athlete.Gender, [Validators.required])
    });
  }


  get name() { return this.form!.get('Name') }
  get surname() { return this.form!.get('Surname') }
  get birthDate() { return this.form!.get('BirthDate') }
  get gender() { return this.form!.get('Gender') }
  get email() { return this.form!.get('Email') }
  get telephone() { return this.form!.get('Telephone') }

  OnCreateClick = async (): Promise<void> => {

    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const date = this.form.get('BirthDate')?.value;
    const model: IRegisterToCompetitionRequest = {
      Name: this.form.get('Name')?.value,
      Surname: this.form.get('Surname')?.value,
      BirthDate: DateUtils.ToNoTimeZoneDate(date.year, date!.month - 1, date!.day),
      Gender: this.form.get('Gender')?.value,
      Telephone: this.form.get('Telephone')?.value,
      Email: this.form.get('Email')?.value,
    };

    const result = await this.competitionsService.UpdateRegistrationToCompetition(this.Athlete.IdCompetition, this.Athlete.Id, model);
    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess(`${model.Name} ${model.Surname} aggiornato con successo`);
      this.AthleteUpdated.emit(this.Athlete);
      setTimeout(() => {
        this.form.reset();
        this.formSubmittedAtLeastOnce = false;
      }, 200);
    } else {
      this.toastService.showDanger(`Errore nell'aggiornamento del partecipante ${model.Name} ${model.Surname}`);
    }
  }
}
