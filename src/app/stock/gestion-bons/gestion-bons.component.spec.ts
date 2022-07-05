import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBonsComponent } from './gestion-bons.component';

describe('GestionBonsComponent', () => {
  let component: GestionBonsComponent;
  let fixture: ComponentFixture<GestionBonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionBonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
