import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseConducteurComponent } from './analyse-conducteur.component';

describe('AnalyseConducteurComponent', () => {
  let component: AnalyseConducteurComponent;
  let fixture: ComponentFixture<AnalyseConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseConducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
