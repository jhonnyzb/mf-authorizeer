import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundLoginComponent } from './background-login.component';

describe('BackgroundLoginComponent', () => {
  let component: BackgroundLoginComponent;
  let fixture: ComponentFixture<BackgroundLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundLoginComponent]
    });
    fixture = TestBed.createComponent(BackgroundLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
