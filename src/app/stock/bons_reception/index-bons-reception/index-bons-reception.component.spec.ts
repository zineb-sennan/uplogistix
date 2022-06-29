import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBonsReceptionComponent } from './index-bons-reception.component';

describe('IndexBonsReceptionComponent', () => {
  let component: IndexBonsReceptionComponent;
  let fixture: ComponentFixture<IndexBonsReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBonsReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBonsReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
