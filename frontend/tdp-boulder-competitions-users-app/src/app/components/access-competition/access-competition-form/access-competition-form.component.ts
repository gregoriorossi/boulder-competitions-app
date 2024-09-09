import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ICompetition } from "../../../models/competitions.models";
import { CompetitionsService } from "../../../services/competitions.service";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: 'app-access-competition-form',
  templateUrl: './access-competition-form.component.html',
  styleUrls: ['./access-competition-form.component.scss']
})
export class AccessCompetitionFormComponent implements OnInit {

  @Output() OnSuccess = new EventEmitter<void>();
  @Output() OnError = new EventEmitter<void>();

  Competitions: ICompetition[] = [];

  form!: FormGroup;
  formSubmittedAtLeastOnce: boolean = false;
  AccessButtonDisabled: boolean = false;

  IsNotRegisteredMessageVisible: boolean = false;

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private toastService: ToastService,
    private cookieService: CookieService)
  { }

  async ngOnInit(): Promise<void> {

    await this.LoadCompetitions();

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      CompetitionId: new FormControl('', [Validators.required])
    });

    this.activetedRoute.params.subscribe(async params => {
      const path = params["id"];
      console.log(path);
      console.log(this.Competitions);
      const competition = this.Competitions.find(c => c.PublicPath == path);

      if (competition) {
        this.form.patchValue({
          CompetitionId: competition.Id
        });
      } else if (this.Competitions.length) {
        this.form.patchValue({
          CompetitionId: this.Competitions[0].Id
        });
      }
    });
  }

  get email() { return this.form!.get('Email') }
  get competitionId() { return this.form!.get('CompetitionId') }

  OnAccessClick = async (): Promise<void> => {
    this.formSubmittedAtLeastOnce = true;
    this.IsNotRegisteredMessageVisible = false;

    if (!this.form.valid)
      return;

    try {
      const competitionId = this.form.get('CompetitionId')?.value;
      const email = this.form.get('Email')?.value;

      this.AccessButtonDisabled = true;
      const result = await this.competitionsService.IsUserRegisteredToCompetition(competitionId, email);

      if (!result.IsRegistered) {
        this.IsNotRegisteredMessageVisible = true;
      } else {
        this.cookieService.set('user', email, 1);
        const url: string = `/gara/${result.PublicPath}`;
        this.router.navigate([url]);
      }

    } catch (err) {
      this.toastService.showDanger("C'è stato un problema, riprovare");
    } finally {
      this.AccessButtonDisabled = false;
    }
  }

  private LoadCompetitions = async (): Promise<void> => {
    try {
      this.Competitions = await this.competitionsService.GetAllCompetitions();
    } catch (err) {
      console.log(err);
      this.toastService.showDanger("C'è stato un problema, riprovare");
    }
  }
}
