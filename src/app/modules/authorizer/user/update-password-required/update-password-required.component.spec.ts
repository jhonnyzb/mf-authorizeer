import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordRequiredComponent } from './update-password-required.component';

describe('UpdatePasswordRequiredComponent', () => {
  let component: UpdatePasswordRequiredComponent;
  let fixture: ComponentFixture<UpdatePasswordRequiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordRequiredComponent]
    });
    fixture = TestBed.createComponent(UpdatePasswordRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
