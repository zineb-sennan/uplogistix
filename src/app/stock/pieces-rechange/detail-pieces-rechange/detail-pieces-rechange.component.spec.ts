import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPiecesRechangeComponent } from './detail-pieces-rechange.component';

describe('DetailPiecesRechangeComponent', () => {
  let component: DetailPiecesRechangeComponent;
  let fixture: ComponentFixture<DetailPiecesRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPiecesRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPiecesRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
