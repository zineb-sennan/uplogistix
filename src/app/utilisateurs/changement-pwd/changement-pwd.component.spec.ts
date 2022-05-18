import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementPwdComponent } from './changement-pwd.component';

describe('ChangementPwdComponent', () => {
  let component: ChangementPwdComponent;
  let fixture: ComponentFixture<ChangementPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangementPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
