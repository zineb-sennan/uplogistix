import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInventairesComponent } from './edit-inventaires.component';

describe('EditInventairesComponent', () => {
  let component: EditInventairesComponent;
  let fixture: ComponentFixture<EditInventairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInventairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
