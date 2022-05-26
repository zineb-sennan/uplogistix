import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheConducteurComponent } from './fiche-conducteur.component';

describe('FicheConducteurComponent', () => {
  let component: FicheConducteurComponent;
  let fixture: ComponentFixture<FicheConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheConducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
