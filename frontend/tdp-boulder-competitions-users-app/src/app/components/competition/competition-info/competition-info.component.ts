import { Component, Input, OnInit } from "@angular/core";
import { ICompetition } from "../../../models/competitions.models";

@Component({
  selector: 'app-competition-info',
  templateUrl: './competition-info.component.html',
  styleUrls: ['./competition-info.component.scss']
})
export class CompetitonInfoComponent implements OnInit {

  @Input() Competition!: ICompetition;

  ngOnInit(): void {
  }
}
