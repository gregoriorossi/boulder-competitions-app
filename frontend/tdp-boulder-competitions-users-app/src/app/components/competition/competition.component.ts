import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Cookies } from "../../constants/cookies";
import { CompetitionStateType, GetCompetitionToRegisterForStatus, IAthlete, ICompetitionInfo } from "../../models/competitions.models";
import { StatusTypes } from "../../models/services.models";
import { CompetitionsService } from "../../services/competitions.service";
import { DialogsService } from "../../services/dialogs.service";
import { ToastService } from "../../services/toast.service";
import { DateUtils } from "../../utils/date.utils";
import { StringUtils } from "../../utils/string.utils";

@Component({
  selector: 'app-competiton',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitonComponent implements OnInit {
  CompetitionStateType = CompetitionStateType;
  Competition!: ICompetitionInfo;
  Athlete!: IAthlete;
  CompetitionStatus!: GetCompetitionToRegisterForStatus;

  CompetitionComponentTabs = CompetitionComponentTabs;
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.INFO;

  ready: boolean = false;

  competitionPath!: string;
  userEmail!: string;

  DateUtils = DateUtils;

  constructor(
    private competitionsService: CompetitionsService,
    private activetedRoute: ActivatedRoute,
    private dialogsService: DialogsService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private router: Router  )
  { }


  async ngOnInit(): Promise<void> {

    this.activetedRoute.params.subscribe(async params => {
      try {
        this.competitionPath = params["path"];
        this.Competition = await this.competitionsService.GetCompetitionInfoByPath(this.competitionPath);
        
        this.userEmail = this.cookieService.get(Cookies.User);
        if (StringUtils.IsNullOrEmpty(this.userEmail)) {
          this.RedirectHome();
        }

        const isRegisteredResult = await this.competitionsService.IsUserRegisteredToCompetition(this.Competition.Id, this.userEmail);
        const isRegistered: boolean = isRegisteredResult.IsRegistered;
        if (!isRegistered) {
          this.RedirectHome();
        }

        this.Athlete = isRegisteredResult.Athlete;

        this.ready = true;
      } catch (err) {
        console.log(err);
        this.toastService.showDanger("Errore nel caricamento della gara");
      }
      
    });
  }

  IsTabContentVisible = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab;
  }

  TabActiveClass = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab ? "active" : "";
  }

  OnTabClick = async (tabType: CompetitionComponentTabs): Promise<void> => {
    this.activeTab = tabType;
    this.Competition = await this.competitionsService.GetCompetitionInfoByPath(this.competitionPath);
  }

  OnUnsubscribeClick = (): void => {
    const confirmFn = async (): Promise<void> => {
      const result = await this.competitionsService.DeleteRegistration(this.Competition.Id, this.Athlete.Id);
      if (result.Status === StatusTypes.OK) {
        this.toastService.showSuccess("Registrazione cancellata con successo");
        this.RedirectHome();
      } else {
        this.toastService.showDanger("Errore nella cancellazione della registrazione");
      }
    };
    
    this.dialogsService.Confirm("Vuoi cancellare la tua iscrizione", "Ne sei veramente sicuro?", "Conferma", "Annulla", confirmFn, () => { });
  }

  private RedirectHome = (): void => {
    this.router.navigate([""]);
  }
}



enum CompetitionComponentTabs {
  INFO = 1,
  RANKINGS = 2,
  PROBLEMS = 3
}
