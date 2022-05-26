import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementConducteursComponent } from './classement-conducteurs.component';

describe('ClassementConducteursComponent', () => {
  let component: ClassementConducteursComponent;
  let fixture: ComponentFixture<ClassementConducteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassementConducteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementConducteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
