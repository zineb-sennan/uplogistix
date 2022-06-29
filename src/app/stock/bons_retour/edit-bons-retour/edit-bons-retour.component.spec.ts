import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonsRetourComponent } from './edit-bons-retour.component';

describe('EditBonsRetourComponent', () => {
  let component: EditBonsRetourComponent;
  let fixture: ComponentFixture<EditBonsRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBonsRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBonsRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
