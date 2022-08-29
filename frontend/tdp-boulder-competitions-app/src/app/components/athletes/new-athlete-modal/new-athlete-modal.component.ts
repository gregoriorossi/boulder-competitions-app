import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAthlete } from '../../../models/athletes.models';

@Component({
  selector: 'app-new-athlete-modal',
  templateUrl: './new-athlete-modal.component.html',
  styleUrls: ['./new-athlete-modal.component.scss']
})
export class NewAthleteModalComponent implements OnInit {

  @ViewChild('modal', { static: true }) modalEl!: ElementRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}


  open() {
    this.modalService.open(this.modalEl, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnAthleteAdded = (athlete: IAthlete): void => {
    this.modalService.dismissAll();
  }
}
