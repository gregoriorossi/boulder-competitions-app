import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAthlete } from '../../../models/athletes.models';

@Component({
  selector: 'app-new-athlete-modal',
  templateUrl: './new-athlete-modal.component.html',
  styleUrls: ['./new-athlete-modal.component.scss']
})
export class NewAthleteModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnAthleteAdded = (athlete: IAthlete): void => {
    this.modalService.dismissAll();
  }
}
