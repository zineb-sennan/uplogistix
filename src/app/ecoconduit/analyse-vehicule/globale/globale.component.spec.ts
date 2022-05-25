import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaleComponent } from './globale.component';

describe('GlobaleComponent', () => {
  let component: GlobaleComponent;
  let fixture: ComponentFixture<GlobaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
