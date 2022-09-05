import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionRankingsComponent } from './competition-rankings.component';

describe('CompetitionRankingsComponent', () => {
  let component: CompetitionRankingsComponent;
  let fixture: ComponentFixture<CompetitionRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionRankingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
