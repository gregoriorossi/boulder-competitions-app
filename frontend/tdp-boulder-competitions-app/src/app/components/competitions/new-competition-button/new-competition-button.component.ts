import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddCompetitionRequest } from '../../../models/competitions.models';
import { StatusTypes } from '../../../models/services.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { ToastService } from '../../../services/toast.service';

interface INewCompetitionsButtonModel {
  Title: string;
  Date?: NgbDateStruct | undefined | null;
}

@Component({
  selector: 'app-new-competition-button',
  templateUrl: './new-competition-button.component.html',
  styleUrls: ['./new-competition-button.component.scss']
})
export class NewCompetitionButtonComponent implements OnInit {

  model: INewCompetitionsButtonModel = {
    Title: "",
    Date: null 
  };

  closeResult: string = "";

  constructor(
    private modalService: NgbModal,
    private competitionsService: CompetitionsService,
    private toastService: ToastService)
  { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  OnCreateClick = async (): Promise<void> => {
    // validation

    if (!this.model.Date)
      return;

    const model: IAddCompetitionRequest = {
      Title: this.model.Title,
      Date: new Date(this.model.Date.year, this.model.Date.month - 1, this.model.Date.day)
    };

    const result = await this.competitionsService.AddCompetition(model);


    if (result.Status === StatusTypes.OK) {
      this.modalService.dismissAll();

      // alert all ok
      this.toastService.showStandard('I am a standard toast');
      this.toastService.showSuccess('I am a success toast');
      this.toastService.showDanger('I am a danger toast');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
