import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICompetition, IProblem } from '../../../../models/competitions.models';
import { IUpdateProblemRequest } from '../../../../models/problems.models';
import { ProblemsService } from '../../../../services/problems.service';
import { ToastService } from '../../../../services/toast.service';
import { ColorsUtils } from '../../../../utils/colors.utils';

@Component({
  selector: 'app-editable-problem',
  templateUrl: './editable-problem.component.html',
  styleUrls: ['./editable-problem.component.scss']
})
export class EditableProblemComponent implements OnInit {
  @Input() Competition!: ICompetition;
  @Input() Problem!: IProblem;
  @Input() Color!: string;
  @Input() IsSpecial!: boolean;

  @Output() OnEdit: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;

  DeleteButtonDisabled: boolean = false;
  EditButtonDisabled: boolean = false;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private problemsService: ProblemsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      ProblemName: new FormControl(this.Problem.Title, [Validators.required])
    });
  }

  get problemName() { return this.form!.get('ProblemName') }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  get GetCssColorClass(): string {
    return this.IsSpecial ? "problem-special" : ColorsUtils.GetCssByColor(this.Color);
  } 

  OnEditClick = async (): Promise<void> => { 
    try {
      const model: IUpdateProblemRequest = {
        Title: this.problemName?.value,
        CompetitionId: this.Competition.Id,
        ProblemId: this.Problem.Id
      };
      await this.problemsService.UpdateProblem(model);
      this.toastService.showSuccess("Blocco modificato con successo");
      this.OnEdit.emit();
      this.modalService.dismissAll();
    } catch (err) {
      console.log(err);
      this.toastService.showDanger("Errore nella modifica del blocco");
    }
  }

  OnDeleteProblemClick = async (): Promise<void> => {
    try {
      const result = await this.problemsService.DeleteProblem(this.Competition.Id, this.Problem.Id);
      this.toastService.showSuccess("Blocco cancellato correttamente");
      this.OnEdit.emit();
      this.modalService.dismissAll();
    } catch (err) {
      console.log(err);
      this.toastService.showDanger("Errore nella cancellazione del blocco");
    }  
  }
}

