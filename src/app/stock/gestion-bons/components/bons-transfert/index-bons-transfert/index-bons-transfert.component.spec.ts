import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBonsTransfertComponent } from './index-bons-transfert.component';

describe('IndexBonsTransfertComponent', () => {
  let component: IndexBonsTransfertComponent;
  let fixture: ComponentFixture<IndexBonsTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBonsTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBonsTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
