import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementVehiculeComponent } from './classement-vehicule.component';

describe('ClassementVehiculeComponent', () => {
  let component: ClassementVehiculeComponent;
  let fixture: ComponentFixture<ClassementVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassementVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
