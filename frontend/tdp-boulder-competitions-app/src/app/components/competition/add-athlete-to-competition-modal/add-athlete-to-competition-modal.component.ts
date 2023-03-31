import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAthlete } from '../../../models/athletes.models';

@Component({
  selector: 'app-add-athlete-to-competition-modal',
  templateUrl: './add-athlete-to-competition-modal.component.html',
  styleUrls: ['./add-athlete-to-competition-modal.component.scss']
})
export class AddAthleteToCompetitionModalComponent implements OnInit {

  @Input() CompetitionId!: number;
  @ViewChild('modal', { static: true }) modalEl!: ElementRef;

  SelectedAthlete: IAthlete | undefined;
  Athletes: IAthlete[] = [];
  model: any;

  constructor(private modalService: NgbModal)
  { }

  async ngOnInit(): Promise<void> {
  }

  public Open = (): void => {
    this.modalService.open(this.modalEl, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnNewAthleteAdded = async (): Promise<void> => {
    this.modalService.dismissAll();
  }
}
