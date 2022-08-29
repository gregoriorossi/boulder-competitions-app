import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConfirmationDialogModel } from '../../../models/dialogs.models';
import { DialogsService } from '../../../services/dialogs.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @ViewChild('modal', { static: true }) modalEl!: ElementRef;

  Dialog: IConfirmationDialogModel = {
    message: '',
    cancelFn: () => { },
    confirmFn: async () => { }
  };

  constructor(private modalService: NgbModal,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.dialogsService.confirmationMessages.subscribe(message => {
      this.Dialog = message;
      this.modalService.open(this.modalEl, { ariaLabelledBy: 'modal-basic-title' });
    });
  }

  ConfirmFn = async (): Promise<void> => {
    this.modalService.dismissAll();
    this.Dialog.confirmFn();
  }

  CancelFn = async (): Promise<void> => {
    this.modalService.dismissAll();
    this.Dialog.cancelFn();
  }
}
