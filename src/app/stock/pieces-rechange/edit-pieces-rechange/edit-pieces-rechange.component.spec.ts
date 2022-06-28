import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPiecesRechangeComponent } from './edit-pieces-rechange.component';

describe('EditPiecesRechangeComponent', () => {
  let component: EditPiecesRechangeComponent;
  let fixture: ComponentFixture<EditPiecesRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPiecesRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPiecesRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
