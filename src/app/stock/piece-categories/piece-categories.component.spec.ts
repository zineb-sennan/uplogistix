import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceCategoriesComponent } from './piece-categories.component';

describe('PieceCategoriesComponent', () => {
  let component: PieceCategoriesComponent;
  let fixture: ComponentFixture<PieceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
