import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddCompetitionRequest } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { ToastService } from '../../../services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-competition-button',
  templateUrl: './new-competition-button.component.html',
  styleUrls: ['./new-competition-button.component.scss']
})
export class NewCompetitionButtonComponent implements OnInit {

  @Output() onCompetitionCreated: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  CreateButtonDisabled: boolean = false;

  constructor(
    private modalService: NgbModal,
    private competitionsService: CompetitionsService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      Date: new FormControl(null, [Validators.required])
    });
  }

  get title() { return this.form!.get('Title') }
  get date() { return this.form!.get('Date') }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnCreateClick = async (): Promise<void> => {

    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const date  = this.form.get('Date')?.value;
    const dateStr: string = moment(new Date(date!.year, date!.month - 1, date!.day)).format("YYYY-MM-DD");

    const model: IAddCompetitionRequest = {
      title: this.form.get('Title')?.value,
      event_date: dateStr
    };

    this.CreateButtonDisabled = true;
    const result = await this.competitionsService.AddCompetition(model);

    if (result === StatusTypes.OK) {
      this.modalService.dismissAll();
      this.toastService.showSuccess('Gara aggiunta con successo');
      this.onCompetitionCreated.emit();

      setTimeout(() => {
        this.form.reset();
        this.formSubmittedAtLeastOnce = false;
      }, 200);
    } else {
      this.toastService.showDanger('Errore nella cancellazione della gara');
    }

    this.CreateButtonDisabled = false;
  }
}
