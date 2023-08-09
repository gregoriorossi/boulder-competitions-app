import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
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
      BirthPlace: new FormControl('', [Validators.required]),
      AddressCity: new FormControl('', [Validators.required]),
      AddressNumber: new FormControl('', [Validators.required]),
      AddressProvince: new FormControl('', [Validators.required]),
      AddressStreet: new FormControl('', [Validators.required]),
      BirthProvince: new FormControl('', [Validators.required]),
      IsMinor: new FormControl(false, [Validators.required]),
      TutorSurname: new FormControl('', [this.TutorFieldsValidator]),
      TutorName: new FormControl('', [this.TutorFieldsValidator]),
      TutorBirthDate: new FormControl(null, [this.TutorFieldsValidator]),
      TutorBirthPlace: new FormControl('', [this.TutorFieldsValidator]),
      TutorBirthProvince: new FormControl('', [this.TutorFieldsValidator]),
      TutorAddressCity: new FormControl('', [this.TutorFieldsValidator]),
      TutorAddressStreet: new FormControl('', [this.TutorFieldsValidator]),
      TutorAddressNumber: new FormControl('', [this.TutorFieldsValidator]),
      TutorAddressProvince: new FormControl('', [this.TutorFieldsValidator]),
      TutorTelephone: new FormControl('', [Validators.required])
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


  OnRegisterClick = async (): Promise<void> => {
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
      TutorBirthDate: DateUtils.ToNoTimeZoneDate(tutorDate.year, tutorDate!.month - 1, tutorDate!.day),
      TutorBirthPlace: this.form.get('TutorBirthPlace')?.value,
      TutorBirthProvince: this.form.get('TutorBirthProvince')?.value,
      TutorAddressCity: this.form.get('TutorAddressCity')?.value,
      TutorAddressStreet: this.form.get('TutorAddressStreet')?.value,
      TutorAddressNumber: this.form.get('TutorAddressNumber')?.value,
      TutorAddressProvince: this.form.get('TutorAddressProvince')?.value,
      TutorTelephone: this.form.get('TutorTelephone')?.value
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

  get getDatiMinoreText() {
    return this.isMinor?.value ? "(dati minore)" : "";
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
