import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbAccordion, NgbCalendar, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { IAthlete } from '../../../models/athletes.models';
import { AthletesService } from '../../../services/athletes.service';
import { CompetitionsService } from '../../../services/competitions.service';

@Component({
  selector: 'app-add-athlete-to-competition-modal',
  templateUrl: './add-athlete-to-competition-modal.component.html',
  styleUrls: ['./add-athlete-to-competition-modal.component.scss']
})
export class AddAthleteToCompetitionModalComponent implements OnInit {


  @ViewChild('modal', { static: true }) modalEl!: ElementRef;

  SelectedAthlete: IAthlete | undefined;
  Athletes: IAthlete[] = [];
  model: any;

  constructor(private modalService: NgbModal,
    private competitionsService: CompetitionsService,
    private athletesService: AthletesService) { }

  async ngOnInit(): Promise<void> {
    this.Athletes = await this.competitionsService.GetAthletes();
  }

  public Open = (): void => {
    this.modalService.open(this.modalEl, { ariaLabelledBy: 'modal-basic-title' });
  }

  FormatSearchTips = (athlete: IAthlete): string => {
    return `${athlete.Surname} ${athlete.Name}`;
  }

  OnNewAthleteAdded = async (athlete: IAthlete): Promise<void> => {
    this.Athletes = await this.competitionsService.GetAthletes();
  }

  Search: OperatorFunction<string, readonly IAthlete[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),

    map(term => this.Athletes.filter((a: IAthlete): boolean => {
      const nameResult: boolean = a.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
      const surnnameResult: boolean = a.Surname.toLowerCase().indexOf(term.toLowerCase()) > -1;
      return nameResult || surnnameResult;
    })
      .sort(this.SortResults)
      .slice(0, 10))
  );

  private SortResults = (a1: IAthlete, a2: IAthlete): number => {
    if (a1.Surname > a2.Surname) return 1;
    if (a1.Surname < a2.Surname) return -1;

    if (a1.Name > a2.Name) return 1;
    if (a1.Name < a2.Name) return -1;

    return 0;
  }
}
