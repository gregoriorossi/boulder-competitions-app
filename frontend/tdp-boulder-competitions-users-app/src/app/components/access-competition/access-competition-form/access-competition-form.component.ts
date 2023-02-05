import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompetitionsService } from "../../../services/competitions.service";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: 'app-access-competition-form',
  templateUrl: './access-competition-form.component.html',
  styleUrls: ['./access-competition-form.component.scss']
})
export class AccessCompetitionFormComponent implements OnInit {

  @Output() OnSuccess = new EventEmitter<void>();
  @Output() OnError = new EventEmitter<void>();

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  AccessButtonDisabled: boolean = false;

  constructor(
    private modalService: NgbModal,
    private competitionsService: CompetitionsService,
    private toastService: ToastService)
  { }

  async ngOnInit(): Promise<void> {

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      CompetitionId: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.form!.get('Email') }
  get competitionId() { return this.form!.get('CompetitionId') }

  OnAccessClick = async (): Promise<void> => {
    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const model: any = {
      CompetitionId: this.form.get('CompetitionId')?.value,
      Email: this.form.get('Email')?.value
    };

    this.AccessButtonDisabled = true;
    const result = await this.competitionsService.GetUserLinkToCompetition();

    //if (result.Status === StatusTypes.OK) {
    //  this.modalService.dismissAll();
    //  this.toastService.showSuccess('Registrazione avvenuta con successo');
    //  this.OnRegistration.emit();

    //  setTimeout(() => {
    //    this.form.reset();
    //    this.formSubmittedAtLeastOnce = false;
    //  }, 200);
    //} else {
    //  this.toastService.showDanger('Errore nella registrazione della gara');
    //  this.OnRegistrationError.emit();
    //}

    this.AccessButtonDisabled = false;
  }
}
