import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumatiqueComponent } from './pneumatique.component';

describe('PneumatiqueComponent', () => {
  let component: PneumatiqueComponent;
  let fixture: ComponentFixture<PneumatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PneumatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PneumatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
