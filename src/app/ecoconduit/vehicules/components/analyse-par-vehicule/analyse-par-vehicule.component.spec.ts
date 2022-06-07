import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseParVehiculeComponent } from './analyse-par-vehicule.component';

describe('AnalyseParVehiculeComponent', () => {
  let component: AnalyseParVehiculeComponent;
  let fixture: ComponentFixture<AnalyseParVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseParVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseParVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
