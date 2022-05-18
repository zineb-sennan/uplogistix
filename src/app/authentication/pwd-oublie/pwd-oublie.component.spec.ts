import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdOublieComponent } from './pwd-oublie.component';

describe('PwdOublieComponent', () => {
  let component: PwdOublieComponent;
  let fixture: ComponentFixture<PwdOublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdOublieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
