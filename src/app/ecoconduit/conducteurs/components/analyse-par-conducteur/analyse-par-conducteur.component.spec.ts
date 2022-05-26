import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseParConducteurComponent } from './analyse-par-conducteur.component';

describe('AnalyseParConducteurComponent', () => {
  let component: AnalyseParConducteurComponent;
  let fixture: ComponentFixture<AnalyseParConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseParConducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseParConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
