import { Component, Input, OnInit,  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProblemColor } from '../../../../models/competitions.models';
import { ProblemsService } from '../../../../services/problems.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-edit-colors-button',
  templateUrl: './edit-colors-button.component.html',
  styleUrls: ['./edit-colors-button.component.scss']
})
export class EditColorsButtonComponent implements OnInit {

  @Input() CompetitionId!: number | undefined;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  CreateButtonDisabled: boolean = false;

  Colors: IProblemColor[] = [];

  constructor(
    private modalService: NgbModal,
    private problemsService: ProblemsService,
    private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    this.Colors = await this.problemsService.GetColorsByCompetitionId(this.CompetitionId!);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}

