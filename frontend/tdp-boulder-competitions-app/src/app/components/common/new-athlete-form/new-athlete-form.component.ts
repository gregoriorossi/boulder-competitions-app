import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../../models/athletes.models';
import { IRegisterToCompetitionRequest } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { ToastService } from '../../../services/toast.service';
import { DateUtils } from '../../../utils/date.utils';

@Component({
  selector: 'app-new-athlete-form',
  templateUrl: './new-athlete-form.component.html',
  styleUrls: ['./new-athlete-form.component.scss']
})
export class NewAthleteFormComponent implements OnInit {

  @Output() NewAthleteAdded = new EventEmitter<void>();
  @Input() CompetitionId!: number;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  Gender = Gender;

  constructor(
    private competitionsService: CompetitionsService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      BirthDate: new FormControl('', [Validators.required]),
      Telephone: new FormControl('', [Validators.required]),
      Gender: new FormControl(Gender.MALE, [Validators.required])
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

    const result = await this.competitionsService.RegisterToCompetition(this.CompetitionId, model);
    if (result.Status === StatusTypes.OK) {
      this.toastService.showSuccess(`${model.Name} ${model.Surname} aggiunto con successo`);
      this.NewAthleteAdded.emit();
      setTimeout(() => {
        this.form.reset();
        this.formSubmittedAtLeastOnce = false;
      }, 200);
    } else {
      this.toastService.showDanger(`Errore nell'aggiunta del partecipante ${model.Name} ${model.Surname}`);
    }
  }
}
