import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEntrepotComponent } from './index-entrepot.component';

describe('IndexEntrepotComponent', () => {
  let component: IndexEntrepotComponent;
  let fixture: ComponentFixture<IndexEntrepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexEntrepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
