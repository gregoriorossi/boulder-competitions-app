import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Gender } from "../../../models/athletes.models";
import { ICompetition } from "../../../models/competitions.models";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  protected competition!: ICompetition;

  Gender = Gender;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  constructor() { }

  async ngOnInit(): Promise<void> {

    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      BirthDate: new FormControl(null, [Validators.required]),
      Gender: new FormControl(Gender.MALE, [Validators.required])
    });
  }

  get name() { return this.form!.get('Name') }
  get surname() { return this.form!.get('Surname') }
  get birthDate() { return this.form!.get('BirthDate') }
  get gender() { return this.form!.get('Gender') }

  OnRegisterClick = (): void => {

  }
}
