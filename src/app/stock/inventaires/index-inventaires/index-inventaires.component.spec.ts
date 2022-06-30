import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexInventairesComponent } from './index-inventaires.component';

describe('IndexInventairesComponent', () => {
  let component: IndexInventairesComponent;
  let fixture: ComponentFixture<IndexInventairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexInventairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexInventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
