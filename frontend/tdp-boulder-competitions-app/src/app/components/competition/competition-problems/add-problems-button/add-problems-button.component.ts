import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProblemColor } from '../../../../models/competitions.models';
import { IStoreMultipleProblemsRequest, IStoreMultipleProblemsRequestProblem } from '../../../../models/problems.models';
import { ProblemsService } from '../../../../services/problems.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-add-problems-button',
  templateUrl: './add-problems-button.component.html',
  styleUrls: ['./add-problems-button.component.scss']
})
export class AddProblemsButtonComponent implements OnInit {

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
    this.colors = await this.GetColors();

    this.form = new FormGroup({
      ProblemsNamesLower: new FormControl('1', [Validators.required]),
      ProblemsNamesUpper: new FormControl('2', [Validators.required]),
      ProblemsColor: new FormControl('', [Validators.required])
    });
  }

  get color() { return this.form!.get('ProblemsColor') }
  get nameLower() { return this.form!.get('ProblemsNamesLower') } 
  get nameUpper() { return this.form!.get('ProblemsNamesUpper') }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  OnCreateClick = async (): Promise<void> => {
    this.formSubmittedAtLeastOnce = true;

    if (!this.form.valid)
      return;

    const problems = this.BuildProblemsFromForm();
    const model: IStoreMultipleProblemsRequest = {
      CompetitionId: this.CompetitionId,
      ColorId: this.color?.value,
      Problems: problems
    };

    await this.problemsService.StoreMultiple(model)
    this.problemsService.ProblemsUpdated();
    this.modalService.dismissAll();
  }

  OnColorClick = (color: IProblemColor) => {
    this.form.patchValue({ ProblemsColor: color.Id });
  }

  IsColorSelected = (color: IProblemColor) => {
    return color.Id === this.color?.value;
  }

  private GetColors = async (): Promise<any[]> => {
    const colors = await this.problemsService.GetColorsByCompetitionId(this.CompetitionId);
    return colors;
  }

  private BuildProblemsFromForm = (): IStoreMultipleProblemsRequestProblem[] => {
    const lowerLimit: number = Number.parseInt(this.form.get('ProblemsNamesLower')?.value);
    const upperLimit: number = Number.parseInt(this.form.get('ProblemsNamesUpper')?.value);
    const problems: IStoreMultipleProblemsRequestProblem[] = [];

    for (let i = lowerLimit; i <= upperLimit; i++) {
      problems.push({
        Title: i.toString()
      });
    }

    return problems;
  }
}

