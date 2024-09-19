import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  IsEditButtonDisabled: boolean = false;

  Gender = Gender;

  constructor(
    private competitionsService: CompetitionsService,
    private toastService: ToastService) { }

  ngOnInit(): void {

    const date = moment(this.Athlete.BirthDate).toDate();
    const tutorBirthDate = moment(this.Athlete.TutorBirthDate).toDate();

    this.form = new FormGroup({
      Email: new FormControl(this.Athlete.Email, [Validators.required, Validators.email]),
      Name: new FormControl(this.Athlete.Name, [Validators.required]),
      Surname: new FormControl(this.Athlete.Surname, [Validators.required]),
      BirthDate: new FormControl({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }, [Validators.required]),
      Gender: new FormControl(this.Athlete.Gender, [Validators.required]),
      BirthPlace: new FormControl(this.Athlete.BirthPlace, [Validators.required]),
      AddressCity: new FormControl(this.Athlete.AddressCity, [Validators.required]),
      AddressNumber: new FormControl(this.Athlete.AddressNumber, [Validators.required]),
      AddressProvince: new FormControl(this.Athlete.AddressProvince, [Validators.required]),
      AddressStreet: new FormControl(this.Athlete.AddressStreet, [Validators.required]),
      BirthProvince: new FormControl(this.Athlete.BirthProvince, [Validators.required]),
      IsMinor: new FormControl(this.Athlete.IsMinor, [Validators.required]),
      TutorSurname: new FormControl(this.Athlete.TutorSurname, [this.TutorFieldsValidator]),
      TutorName: new FormControl(this.Athlete.TutorName, [this.TutorFieldsValidator]),
      TutorBirthDate: new FormControl({ day: tutorBirthDate.getDate(), month: tutorBirthDate.getMonth() + 1, year: tutorBirthDate.getFullYear() }, [this.TutorFieldsValidator]),
      TutorBirthPlace: new FormControl(this.Athlete.TutorBirthPlace, [this.TutorFieldsValidator]),
      TutorBirthProvince: new FormControl(this.Athlete.TutorBirthProvince, [this.TutorFieldsValidator]),
      TutorAddressCity: new FormControl(this.Athlete.TutorAddressCity, [this.TutorFieldsValidator]),
      TutorAddressStreet: new FormControl(this.Athlete.TutorAddressStreet, [this.TutorFieldsValidator]),
      TutorAddressNumber: new FormControl(this.Athlete.AddressNumber, [this.TutorFieldsValidator]),
      TutorAddressProvince: new FormControl(this.Athlete.TutorAddressProvince, [this.TutorFieldsValidator]),
      TutorTelephone: new FormControl(this.Athlete.TutorTelephone, [this.TutorFieldsValidator])
    });

    this.form.get('IsMinor')?.valueChanges
      .subscribe(_value => {
        this.form.get('TutorSurname')?.updateValueAndValidity();
        this.form.get('TutorName')?.updateValueAndValidity();
        this.form.get('TutorBirthDate')?.updateValueAndValidity();
        this.form.get('TutorBirthPlace')?.updateValueAndValidity();
        this.form.get('TutorBirthProvince')?.updateValueAndValidity();
        this.form.get('TutorAddressCity')?.updateValueAndValidity();
        this.form.get('TutorAddressStreet')?.updateValueAndValidity();
        this.form.get('TutorAddressNumber')?.updateValueAndValidity();
        this.form.get('TutorAddressProvince')?.updateValueAndValidity();
        this.form.get('TutorTelephone')?.updateValueAndValidity();
      });
  }


  get email() { return this.form!.get('Email') }
  get name() { return this.form!.get('Name') }
  get surname() { return this.form!.get('Surname') }
  get birthDate() { return this.form!.get('BirthDate') }
  get gender() { return this.form!.get('Gender') }
  get birthPlace() { return this.form!.get('BirthPlace') }
  get addressCity() { return this.form!.get('AddressCity') }
  get addressNumber() { return this.form!.get('AddressNumber') }
  get addressProvince() { return this.form!.get('AddressProvince') }
  get addressStreet() { return this.form!.get('AddressStreet') }
  get birthProvince() { return this.form!.get('BirthProvince') }
  get isMinor() { return this.form!.get('IsMinor') }
  get tutorSurname() { return this.form!.get('TutorSurname') }
  get tutorName() { return this.form!.get('TutorName') }
  get tutorBirthDate() { return this.form!.get('TutorBirthDate') }
  get tutorBirthPlace() { return this.form!.get('TutorBirthPlace') }
  get tutorBirthProvince() { return this.form!.get('TutorBirthProvince') }
  get tutorAddressCity() { return this.form!.get('TutorAddressCity') }
  get tutorAddressStreet() { return this.form!.get('TutorAddressStreet') }
  get tutorAddressNumber() { return this.form!.get('TutorAddressNumber') }
  get tutorAddressProvince() { return this.form!.get('TutorAddressProvince') }
  get tutorTelephone() { return this.form!.get('TutorTelephone') }

  OnCreateClick = async (): Promise<void> => {

    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const date = this.form.get('BirthDate')?.value;
    const tutorDate = this.form.get('TutorBirthDate')?.value;

    const model: IRegisterToCompetitionRequest = {
      Email: this.form.get('Email')?.value,
      Name: this.form.get('Name')?.value,
      Surname: this.form.get('Surname')?.value,
      BirthDate: DateUtils.ToNoTimeZoneDate(date.year, date!.month - 1, date!.day),
      Gender: this.form.get('Gender')?.value,
      BirthPlace: this.form.get('BirthPlace')?.value,
      BirthProvince: this.form.get('BirthProvince')?.value,
      AddressCity: this.form.get('AddressCity')?.value,
      AddressNumber: this.form.get('AddressNumber')?.value,
      AddressProvince: this.form.get('AddressProvince')?.value,
      AddressStreet: this.form.get('AddressStreet')?.value,
      IsMinor: this.form.get('IsMinor')?.value,
      TutorSurname: this.form.get('TutorSurname')?.value,
      TutorName: this.form.get('TutorName')?.value,
      TutorBirthDate: tutorDate ? DateUtils.ToNoTimeZoneDate(tutorDate.year, tutorDate!.month - 1, tutorDate!.day) : new Date(),
      TutorBirthPlace: this.form.get('TutorBirthPlace')?.value,
      TutorBirthProvince: this.form.get('TutorBirthProvince')?.value,
      TutorAddressCity: this.form.get('TutorAddressCity')?.value,
      TutorAddressStreet: this.form.get('TutorAddressStreet')?.value,
      TutorAddressNumber: this.form.get('TutorAddressNumber')?.value,
      TutorAddressProvince: this.form.get('TutorAddressProvince')?.value,
      TutorTelephone: this.form.get('TutorTelephone')?.value
    };

    this.IsEditButtonDisabled = true;

    const result = await this.competitionsService.UpdateRegistrationToCompetition(this.Athlete.IdCompetition, this.Athlete.Id, model);
    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess(`${model.Name} ${model.Surname} aggiornato con successo`);
      this.AthleteUpdated.emit(this.Athlete);
      setTimeout(() => {
        this.form.reset();
        this.formSubmittedAtLeastOnce = false;
      }, 200);
    } else if (result.Status === StatusTypes.ERR_USER_ALREADY_REGISTERED) {
      this.toastService.showDanger('Errore nella registrazione, utente già registrato');
    } else {
      this.toastService.showDanger(`Errore nell'aggiornamento del partecipante ${model.Name} ${model.Surname}`);
    }

    this.IsEditButtonDisabled = false;
  }

  private TutorFieldsValidator(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    const isMinor: boolean = formControl.parent.get('IsMinor')?.value;

    if (isMinor) {
      return Validators.required(formControl);
    }
    return null;
  }
}
