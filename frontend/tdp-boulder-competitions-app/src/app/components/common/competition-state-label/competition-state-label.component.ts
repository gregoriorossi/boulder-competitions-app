import { Component, Input, OnInit } from '@angular/core';
import { CompetitionStateType } from '../../../models/competitions.models';
import { CompetitionsUtils } from '../../../utils/competitions.utils';

@Component({
  selector: 'app-competition-state-label',
  templateUrl: './competition-state-label.component.html',
  styleUrls: ['./competition-state-label.component.scss']
})
export class CompetitionStateLabelComponent implements OnInit {

  @Input() State!: CompetitionStateType;

  CompetitionsUtils = CompetitionsUtils;
  
  constructor() { }

  ngOnInit(): void {
  }

}
