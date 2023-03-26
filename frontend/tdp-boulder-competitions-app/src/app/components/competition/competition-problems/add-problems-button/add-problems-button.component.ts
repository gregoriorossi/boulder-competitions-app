import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorCodes } from '../../../../models/common.models';
import { IProblem } from '../../../../models/competitions.models';
import { IStoreMultipleProblemsRequest } from '../../../../models/problems.models';
import { ProblemsService } from '../../../../services/problems.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-add-problems-button',
  templateUrl: './add-problems-button.component.html',
  styleUrls: ['./add-problems-button.component.scss']
})
export class AddProblemsButtonComponent implements OnInit {

  @Input() CompetitionId!: number | undefined;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  CreateButtonDisabled: boolean = false;

  colors: ColorCodes[] = [];

  constructor(
    private modalService: NgbModal,
    private problemsService: ProblemsService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.colors = this.GetColors();
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
      competitionId: this.CompetitionId!,
      problems: problems
    };

    this.problemsService.StoreMultiple(model)
    this.problemsService.ProblemsUpdated();
    this.modalService.dismissAll();
  }

  OnColorClick = (color: ColorCodes) => {
    this.form.patchValue({ ProblemsColor: color });
  }

  IsColorSelected = (color: ColorCodes) => {
    return color === this.color?.value;
  }

  private GetColors = (): ColorCodes[] => {
    return [
      ColorCodes.WHITE,
      ColorCodes.BLUE,
      ColorCodes.GREEN,
      ColorCodes.YELLOW,
      ColorCodes.RED,
      ColorCodes.BLACK
    ];
  }

  private BuildProblemsFromForm = (): IProblem[] => {
    const lowerLimit: number = Number.parseInt(this.form.get('ProblemsNamesLower')?.value);
    const upperLimit: number = Number.parseInt(this.form.get('ProblemsNamesUpper')?.value);
    const problems: IProblem[] = [];

    for (let i = lowerLimit; i <= upperLimit; i++) {
      problems.push({
        Name: i.toString()
      });
    }

    return problems;
  }
}

