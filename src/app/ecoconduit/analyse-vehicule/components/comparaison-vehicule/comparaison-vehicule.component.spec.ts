import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaisonVehiculeComponent } from './comparaison-vehicule.component';

describe('ComparaisonVehiculeComponent', () => {
  let component: ComparaisonVehiculeComponent;
  let fixture: ComponentFixture<ComparaisonVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparaisonVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparaisonVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
