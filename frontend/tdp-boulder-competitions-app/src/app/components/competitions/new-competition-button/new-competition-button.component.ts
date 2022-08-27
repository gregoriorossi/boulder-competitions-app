import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddCompetitionRequest } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { ToastService } from '../../../services/toast.service';


@Component({
  selector: 'app-new-competition-button',
  templateUrl: './new-competition-button.component.html',
  styleUrls: ['./new-competition-button.component.scss']
})
export class NewCompetitionButtonComponent implements OnInit {

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

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

    const date = this.form.get('Date')?.value;
    const model: IAddCompetitionRequest = {
      Title: this.form.get('Title')?.value,
      Date: new Date(date!.year, date!.month - 1, date!.day)
    };

    const result = await this.competitionsService.AddCompetition(model);


    if (result.Status === StatusTypes.OK) {
      this.modalService.dismissAll();
      this.toastService.showSuccess('Gara aggiunta con successo');
      setTimeout(() => {
        this.form.reset();
      }, 200);
    }
  }
}
