import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ICompetitionInfo, IRankingRow, IUpdateCompetitionInfoRequest } from '../../../models/competitions.models';
import { CompetitionsService } from '../../../services/competitions.service';
import { TextEditorUtils } from '../../../utils/text-editor.utils';
import * as moment from 'moment';
import { DateUtils } from '../../../utils/date.utils';
import { StatusTypes } from '../../../models/services.models';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-competition-info-gara',
  templateUrl: './competition-info-gara.component.html',
  styleUrls: ['./competition-info-gara.component.scss']
})
export class CompetitionInfoGaraComponent implements OnInit {

  @Input() CompetitionId!: number;

  Ready: boolean = false;

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  SaveButtonDisabled: boolean = false;

  descriptionEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui la descrizione'});
  emailBodyEditorConfig: AngularEditorConfig = TextEditorUtils.getDefaultEditorConfig({ placeholder: 'Inserisci qui il corpo della email' });

  competitionInfo!: ICompetitionInfo;

  coverImageFile: File|null = null;
  coverImage: string = "";

  constructor(
    private competitionsService: CompetitionsService,
    private toastService: ToastService)
  { }

  ranking: IRankingRow[] = [];

  async ngOnInit(): Promise<void> {


    this.competitionInfo = await this.competitionsService.GetCompetitionInfo(this.CompetitionId!);

    const date = moment(this.competitionInfo.EventDate).toDate();

    this.form = new FormGroup({
      Title: new FormControl(this.competitionInfo.Title, [Validators.required]),
      Date: new FormControl({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}, [Validators.required]),
      Description: new FormControl(this.competitionInfo.Description, [Validators.required]),
      EmailSubject: new FormControl(this.competitionInfo.EmailSubject, [Validators.required]),
      EmailBody: new FormControl(this.competitionInfo.EmailBody, [Validators.required]),
      CoverImage: new FormControl(this.competitionInfo.CoverImage, []),
    });

    this.Ready = true;
  }

  get title() { return this.form!.get('Title') }
  get date() { return this.form!.get('Date') }
  get description() { return this.form!.get('Description') }
  get emailSubject() { return this.form!.get('EmailSubject') }
  get emailBody() { return this.form!.get('EmailBody') }

  public OnSaveClick = async (): Promise<void> => {
    this.SaveButtonDisabled = true;

    const date = this.form.get('Date')?.value;

    const data: IUpdateCompetitionInfoRequest = {
      title: this.title?.value,
      event_date: DateUtils.ToNoTimeZoneDate(date.year, date!.month - 1, date!.day),
      description: this.description?.value,
      email_subject: this.emailSubject?.value,
      email_body: this.emailBody?.value,
      cover_image: this.coverImage,
      cover_image_file: this.coverImageFile ? this.coverImageFile : null,
    }

    const result = await this.competitionsService.UpdateInfo(this.CompetitionId, data);
    if (result === StatusTypes.OK) {
      this.toastService.showSuccess("Informazioni salvate");
    } else {
      this.toastService.showDanger("Errore nel salvataggio!")
    }
    this.SaveButtonDisabled = false;
  }

  public OnCoverImageUpload = (event: any) => {
    console.log(event);
    this.coverImageFile = (event!.target as HTMLInputElement)!.files![0];
    this.coverImage = (event!.target as HTMLInputElement).value;
  }
}
