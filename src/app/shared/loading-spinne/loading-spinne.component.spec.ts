import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinneComponent } from './loading-spinne.component';

describe('LoadingSpinneComponent', () => {
  let component: LoadingSpinneComponent;
  let fixture: ComponentFixture<LoadingSpinneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinneComponent]
    });
    fixture = TestBed.createComponent(LoadingSpinneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
