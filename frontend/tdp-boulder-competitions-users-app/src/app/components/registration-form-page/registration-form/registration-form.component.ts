import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Gender } from "../../../models/athletes.models";
import { IRegisterToCompetitionRequest } from "../../../models/competitions.models";
import { StatusTypes } from "../../../models/services.models";
import { CompetitionsService } from "../../../services/competitions.service";
import { ToastService } from "../../../services/toast.service";
import { DateUtils } from "../../../utils/date.utils";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @Output() OnRegistration = new EventEmitter<void>();
  @Output() OnRegistrationError = new EventEmitter<void>();
  @Input() CompetitionId!: number;

  Gender = Gender;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  RegisterButtonDisabled: boolean = false;

  constructor(
    private modalService: NgbModal,
    private competitionsService: CompetitionsService,
    private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      BirthDate: new FormControl(null, [Validators.required]),
      Gender: new FormControl(Gender.MALE, [Validators.required]),
      Telephone: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.form!.get('Email') }
  get name() { return this.form!.get('Name') }
  get surname() { return this.form!.get('Surname') }
  get birthDate() { return this.form!.get('BirthDate') }
  get gender() { return this.form!.get('Gender') }
  get telephone() { return this.form!.get('Telephone') }

  OnRegisterClick = async (): Promise<void> => {
    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const date = this.form.get('BirthDate')?.value;

    const model: IRegisterToCompetitionRequest = {
      Email: this.form.get('Email')?.value,
      Name: this.form.get('Name')?.value,
      Surname: this.form.get('Surname')?.value,
      BirthDate: DateUtils.ToNoTimeZoneDate(date.year, date!.month - 1, date!.day),
      Telephone: this.form.get('Telephone')?.value,
      Gender: this.form.get('Gender')?.value
    };

    this.RegisterButtonDisabled = true;
    const result = await this.competitionsService.RegisterToCompetition(this.CompetitionId, model);

    if (result.Status === StatusTypes.OK) {
      this.modalService.dismissAll();
      this.toastService.showSuccess('Registrazione avvenuta con successo');
      this.OnRegistration.emit();

      setTimeout(() => {
        this.form.reset();
        this.formSubmittedAtLeastOnce = false;
      }, 200);
    } else {
      this.toastService.showDanger('Errore nella registrazione della gara');
      this.OnRegistrationError.emit();
    }

    this.RegisterButtonDisabled = false;
  }
}
