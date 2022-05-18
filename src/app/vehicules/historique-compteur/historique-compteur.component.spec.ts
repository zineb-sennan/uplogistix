import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCompteurComponent } from './historique-compteur.component';

describe('HistoriqueCompteurComponent', () => {
  let component: HistoriqueCompteurComponent;
  let fixture: ComponentFixture<HistoriqueCompteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueCompteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCompteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
