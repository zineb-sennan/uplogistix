import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaleConducteurComponent } from './globale-conducteur.component';

describe('GlobaleConducteurComponent', () => {
  let component: GlobaleConducteurComponent;
  let fixture: ComponentFixture<GlobaleConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobaleConducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobaleConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
