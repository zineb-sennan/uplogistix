import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBonsRetourComponent } from './index-bons-retour.component';

describe('IndexBonsRetourComponent', () => {
  let component: IndexBonsRetourComponent;
  let fixture: ComponentFixture<IndexBonsRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBonsRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBonsRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
