import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseVehiculeComponent } from './analyse-vehicule.component';

describe('AnalyseVehiculeComponent', () => {
  let component: AnalyseVehiculeComponent;
  let fixture: ComponentFixture<AnalyseVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
