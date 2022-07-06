import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdreInterventionComponent } from './edit-ordre-intervention.component';

describe('EditOrdreInterventionComponent', () => {
  let component: EditOrdreInterventionComponent;
  let fixture: ComponentFixture<EditOrdreInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdreInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdreInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
