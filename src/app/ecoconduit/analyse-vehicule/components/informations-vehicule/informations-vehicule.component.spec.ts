import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsVehiculeComponent } from './informations-vehicule.component';

describe('InformationsVehiculeComponent', () => {
  let component: InformationsVehiculeComponent;
  let fixture: ComponentFixture<InformationsVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
