import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonsReceptionComponent } from './edit-bons-reception.component';

describe('EditBonsReceptionComponent', () => {
  let component: EditBonsReceptionComponent;
  let fixture: ComponentFixture<EditBonsReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBonsReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBonsReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
