import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexOrdreInterventionComponent } from './index-ordre-intervention.component';

describe('IndexOrdreInterventionComponent', () => {
  let component: IndexOrdreInterventionComponent;
  let fixture: ComponentFixture<IndexOrdreInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexOrdreInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexOrdreInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
