import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaleVehiculeComponent } from './globale-vehicule.component';

describe('GlobaleVehiculeComponent', () => {
  let component: GlobaleVehiculeComponent;
  let fixture: ComponentFixture<GlobaleVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobaleVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobaleVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
