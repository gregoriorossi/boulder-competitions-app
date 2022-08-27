import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender, IAddAthleteRequest, IAthlete } from '../../../models/athletes.models';
import { StatusTypes } from '../../../models/services.models';
import { AthletesService } from '../../../services/athletes.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-athlete-form',
  templateUrl: './new-athlete-form.component.html',
  styleUrls: ['./new-athlete-form.component.scss']
})
export class NewAthleteFormComponent implements OnInit {

  @Output() NewAthleteAdded = new EventEmitter<IAthlete>();

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  Gender = Gender;

  constructor(
    private athletesService: AthletesService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      BirthDate: new FormControl('', [Validators.required]),
      Gender: new FormControl(Gender.MALE, [Validators.required])
    });
  }


  get name() { return this.form!.get('Name') }
  get surname() { return this.form!.get('Surname') }
  get birthDate() { return this.form!.get('BirthDate') }
  get gender() { return this.form!.get('Gender') }

  OnCreateClick = async (): Promise<void> => {

    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const date = this.form.get('BirthDate')?.value;
    const model: IAddAthleteRequest = {
      Name: this.form.get('Name')?.value,
      Surname: this.form.get('Surname')?.value,
      BirthDate: new Date(date!.year, date!.month - 1, date!.day),
      Gender: this.form.get('Gender')?.value,
    };

    const result = await this.athletesService.AddAthlete(model);

    if (result.Status === StatusTypes.OK) {
      this.NewAthleteAdded.emit(model);
      this.toastService.showSuccess(`${model.Name} ${model.Surname} aggiunto con successo`);
      setTimeout(() => {
        this.form.reset();
      }, 200);
    }
  }
}
