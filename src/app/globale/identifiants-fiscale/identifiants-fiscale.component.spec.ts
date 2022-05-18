import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiantsFiscaleComponent } from './identifiants-fiscale.component';

describe('IdentifiantsFiscaleComponent', () => {
  let component: IdentifiantsFiscaleComponent;
  let fixture: ComponentFixture<IdentifiantsFiscaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifiantsFiscaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiantsFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
