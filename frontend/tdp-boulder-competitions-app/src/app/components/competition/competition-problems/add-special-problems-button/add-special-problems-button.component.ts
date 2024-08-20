import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProblemColor } from '../../../../models/competitions.models';
import { ISpecialProblem, IStoreSpecialProblemRequest } from '../../../../models/problems.models';
import { ProblemsService } from '../../../../services/problems.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-add-special-problems-button',
  templateUrl: './add-special-problems-button.component.html',
  styleUrls: ['./add-special-problems-button.component.scss']
})
export class AddSpecialProblemsButtonComponent implements OnInit {

  @Input() CompetitionId!: number;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  CreateButtonDisabled: boolean = false;

  colors: IProblemColor[] = [];

  constructor(
    private modalService: NgbModal,
    private problemsService: ProblemsService,
    private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      ProblemName: new FormControl('', [Validators.required])
    });
  }

  get problemName() { return this.form!.get('ProblemName') }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnCreateClick = async (): Promise<void> => {
    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const problem = this.BuildProblemFromForm();
    const model: IStoreSpecialProblemRequest = {
      CompetitionId: this.CompetitionId,
      Problem: problem
    };

    await this.problemsService.StoreSpecialProblem(model)
    this.problemsService.ProblemsUpdated();
    this.modalService.dismissAll();
  }


  private BuildProblemFromForm = (): ISpecialProblem => {
    const title: string = this.form.get('ProblemName')?.value;

    return {
      Title: title
    };
  }
}

