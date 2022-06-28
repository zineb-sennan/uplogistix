import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPiecesRechangeComponent } from './index-pieces-rechange.component';

describe('IndexPiecesRechangeComponent', () => {
  let component: IndexPiecesRechangeComponent;
  let fixture: ComponentFixture<IndexPiecesRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPiecesRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPiecesRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
