import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProblem } from '../../../../models/competitions.models';
import { ToastService } from '../../../../services/toast.service';
import { ColorsUtils } from '../../../../utils/colors.utils';

@Component({
  selector: 'app-editable-problem',
  templateUrl: './editable-problem.component.html',
  styleUrls: ['./editable-problem.component.scss']
})
export class EditableProblemComponent implements OnInit {
  @Input() CompetitionId: number | undefined;
  @Input() Problem!: IProblem;
  @Input() Color!: string;

  @Output() OnEdit: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  DeleteButtonDisabled: boolean = false;
  EditButtonDisabled: boolean = false;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      ProblemName: new FormControl(this.Problem.Name, [Validators.required])
    });
  }

  get problemName() { return this.form!.get('ProblemName') }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  GetCssColorClass = (color: string): string => {
    return ColorsUtils.GetCssCByColor(color);
  }

  OnEditClick = (): void => {
    this.toastService.showSuccess("Edited!");
    this.OnEdit.emit();
  }
}

