import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLoginComponent } from './image-login.component';

describe('ImageLoginComponent', () => {
  let component: ImageLoginComponent;
  let fixture: ComponentFixture<ImageLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageLoginComponent]
    });
    fixture = TestBed.createComponent(ImageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
