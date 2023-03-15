import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ICompetitionInfo, IRankingRow, IUpdateCompetitionInfoRequest } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { TextEditorUtils } from '../../../utils/text-editor.utils';
import * as moment from 'moment';
import { DateUtils } from '../../../utils/date.utils';

@Component({
  selector: 'app-competition-info-gara',
  templateUrl: './competition-info-gara.component.html',
  styleUrls: ['./competition-info-gara.component.scss']
})
export class CompetitionInfoGaraComponent implements OnInit {

  @Input() CompetitionId!: string;

  Ready: boolean = false;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  SaveButtonDisabled: boolean = false;

  descriptionEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui la descrizione'});
  emailBodyEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui il corpo della email' });

  competitionInfo!: ICompetitionInfo;

  constructor(private competitionsService: CompetitionsService) { }

  ranking: IRankingRow[] = [];

  async ngOnInit(): Promise<void> {


    this.competitionInfo = await this.competitionsService.GetCompetitionInfo(this.CompetitionId);

    const date = moment(this.competitionInfo.event_date).toDate();
    console.log(date);
    this.form = new FormGroup({
      Title: new FormControl(this.competitionInfo.title, [Validators.required]),
      Date: new FormControl({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}, [Validators.required]),
      Description: new FormControl(this.competitionInfo.description, [Validators.required]),
      EmailSubject: new FormControl(this.competitionInfo.email_subject, [Validators.required]),
      EmailBody: new FormControl(this.competitionInfo.email_body, [Validators.required]),
      CoverImage: new FormControl(this.competitionInfo.cover_image, []),
    });

    this.Ready = true;
  }

  get title() { return this.form!.get('Title') }
  get date() { return this.form!.get('Date') }
  get description() { return this.form!.get('Description') }
  get emailSubject() { return this.form!.get('EmailSubject') }
  get emailBody() { return this.form!.get('EmailBody') }
  get coverImage() { return this.form!.get('CoverImage') }

  public OnSaveClick = async (): Promise<void> => {
    this.SaveButtonDisabled = true;

    const date = this.form.get('Date')?.value;

    const data: IUpdateCompetitionInfoRequest = {
      title: this.title?.value,
      event_date: DateUtils.ToNoTimeZoneDate(date.year, date!.month - 1, date!.day),
      description: this.description?.value,
      email_subject: this.emailSubject?.value,
      email_body: this.emailBody?.value,
      cover_image: this.coverImage?.value
    }

    const result = this.competitionsService.UpdateInfo(this.CompetitionId, data);

    this.SaveButtonDisabled = false;
  }

}
