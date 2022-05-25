import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheVehiculeComponent } from './fiche-vehicule.component';

describe('FicheVehiculeComponent', () => {
  let component: FicheVehiculeComponent;
  let fixture: ComponentFixture<FicheVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
