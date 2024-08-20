import { Component, Input, OnInit } from '@angular/core';
import { IRankingSpecialProblem } from '../../../../../models/competitions.models';
import { DateUtils } from '../../../../../utils/date.utils';

@Component({
  selector: 'app-ranking-special-problem',
  templateUrl: './ranking-special-problem.component.html',
  styleUrls: ['./ranking-special-problem.component.scss']
})
export class RankingSpecialProblemComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() Problem!: IRankingSpecialProblem;

  get cssType(): string {
    return this.Problem.Sent ? "text-bg-success" : "text-bg-warning";
  }

  get sendDateTime(): string {
    if (!this.Problem || !this.Problem.SendDateTime) {
      return "";
    }

    const date = DateUtils.ParseDate(this.Problem.SendDateTime, 'YYYY-MM-DD HH:mm:ss');
    return date.isValid() ? date.format('DD-MM-YYYY HH:mm:ss') : '';
  }
}
