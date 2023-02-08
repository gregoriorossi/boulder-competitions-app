import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetCompetitionToRegisterForStatus, ICompetition } from "../../models/competitions.models";
import { CompetitionsService } from "../../services/competitions.service";
import { DialogsService } from "../../services/dialogs.service";
import { DateUtils } from "../../utils/date.utils";

@Component({
  selector: 'app-competiton',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitonComponent implements OnInit {

  Competition!: ICompetition;
  CompetitionStatus!: GetCompetitionToRegisterForStatus;

  CompetitionComponentTabs = CompetitionComponentTabs;
  activeTab: CompetitionComponentTabs = CompetitionComponentTabs.INFO;

  ready: boolean = false;

  competitionId!: string;
  userId!: string;

  DateUtils = DateUtils;

  constructor(
    private competitionsService: CompetitionsService,
    private activetedRoute: ActivatedRoute,
    private dialogsService: DialogsService)
  { }


  async ngOnInit(): Promise<void> {

    this.activetedRoute.params.subscribe(async params => {
      this.competitionId = params["id"];
      this.userId = params["user"];

      // TODO check se l'utente è iscritto

      const result = await this.competitionsService.GetCompetition(this.competitionId);
      this.Competition = result.Competition;

      this.ready = true;
    });
  }

  IsTabContentVisible = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab;
  }

  TabActiveClass = (tabType: CompetitionComponentTabs) => {
    return tabType === this.activeTab ? "active" : "";
  }

  OnTabClick = (tabType: CompetitionComponentTabs): void => {
    this.activeTab = tabType;
  }

  OnUnsubscribeClick = (): void => {
    const confirmFn = () => {
      // chiama servizio
      // reindirizza da qualche parte
    };
    
    this.dialogsService.Confirm("Vuoi cancellare la tua iscrizione", "Ne sei veramente sicuro?", "Conferma", "Annulla", confirmFn, () => { });
  }
}



enum CompetitionComponentTabs {
  INFO = 1,
  RANKINGS = 2,
  PROBLEMS = 3
}
