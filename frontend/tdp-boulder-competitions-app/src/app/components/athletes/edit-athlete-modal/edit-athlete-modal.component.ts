import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAthlete } from '../../../models/athletes.models';

@Component({
  selector: 'app-edit-athlete-modal',
  templateUrl: './edit-athlete-modal.component.html',
  styleUrls: ['./edit-athlete-modal.component.scss']
})
export class EditAthleteModalComponent implements OnInit {

  @ViewChild('editmodal', { static: true }) modalEl!: ElementRef;
  Athlete!: IAthlete;
  

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }


  open(athlete: IAthlete) {
    console.log(athlete);
    this.modalService.open(this.modalEl, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnAthleteChanged = (athlete: IAthlete): void => {
    this.modalService.dismissAll();
  }
}
