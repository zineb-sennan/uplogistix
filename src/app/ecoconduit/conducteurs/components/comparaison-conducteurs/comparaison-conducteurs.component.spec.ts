import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaisonConducteursComponent } from './comparaison-conducteurs.component';

describe('ComparaisonConducteursComponent', () => {
  let component: ComparaisonConducteursComponent;
  let fixture: ComponentFixture<ComparaisonConducteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparaisonConducteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparaisonConducteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
