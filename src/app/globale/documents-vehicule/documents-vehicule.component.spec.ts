import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsVehiculeComponent } from './documents-vehicule.component';

describe('DocumentsVehiculeComponent', () => {
  let component: DocumentsVehiculeComponent;
  let fixture: ComponentFixture<DocumentsVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
