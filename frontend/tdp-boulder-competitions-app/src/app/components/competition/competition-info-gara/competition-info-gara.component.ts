import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRankingRow } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';

@Component({
  selector: 'app-competition-info-gara',
  templateUrl: './competition-info-gara.component.html',
  styleUrls: ['./competition-info-gara.component.scss']
})
export class CompetitionInfoGaraComponent implements OnInit {

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  SaveButtonDisabled: boolean = false;

  constructor(private competitionsService: CompetitionsService)
  { }

  ranking: IRankingRow[] = [];

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required])
    });
  }

  get title() { return this.form!.get('Title') }
  get description() { return this.form!.get('Description') }
  get email() { return this.form!.get('Email') }

  public OnSaveClick = (): void => {
    alert('save!');
  }
}
