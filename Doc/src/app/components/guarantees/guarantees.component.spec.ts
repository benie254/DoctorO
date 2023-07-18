import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteesComponent } from './guarantees.component';

describe('GuaranteesComponent', () => {
  let component: GuaranteesComponent;
  let fixture: ComponentFixture<GuaranteesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuaranteesComponent]
    });
    fixture = TestBed.createComponent(GuaranteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
