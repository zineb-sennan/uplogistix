import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReparationsComponent } from './gestion-reparations.component';

describe('GestionReparationsComponent', () => {
  let component: GestionReparationsComponent;
  let fixture: ComponentFixture<GestionReparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionReparationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
