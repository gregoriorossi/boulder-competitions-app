import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IRankingRow } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { TextEditorUtils } from '../../../utils/text-editor.utils';

@Component({
  selector: 'app-competition-info-gara',
  templateUrl: './competition-info-gara.component.html',
  styleUrls: ['./competition-info-gara.component.scss']
})
export class CompetitionInfoGaraComponent implements OnInit {

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  SaveButtonDisabled: boolean = false;

  descriptionEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui la descrizione'});
  emailBodyEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui il corpo della email' });


  constructor(private competitionsService: CompetitionsService) { }

  ranking: IRankingRow[] = [];

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      Date: new FormControl(null, [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      EmailSubject: new FormControl('', [Validators.required]),
      EmailBody: new FormControl('', [Validators.required])
    });
  }

  get title() { return this.form!.get('Title') }
  get date() { return this.form!.get('Date') }
  get description() { return this.form!.get('Description') }
  get emailSubject() { return this.form!.get('EmailSubject') }
  get emailBody() { return this.form!.get('EmailBody') }

  public OnSaveClick = (): void => {
    alert('save!');
  }

}
