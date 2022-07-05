import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonsTransfertComponent } from './edit-bons-transfert.component';

describe('EditBonsTransfertComponent', () => {
  let component: EditBonsTransfertComponent;
  let fixture: ComponentFixture<EditBonsTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBonsTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBonsTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
