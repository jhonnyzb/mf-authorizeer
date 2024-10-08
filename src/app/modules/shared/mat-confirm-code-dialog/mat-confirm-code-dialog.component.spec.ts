import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmCodeDialogComponent } from './mat-confirm-code-dialog.component';

describe('MatConfirmCodeDialogComponent', () => {
  let component: MatConfirmCodeDialogComponent;
  let fixture: ComponentFixture<MatConfirmCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmCodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfirmCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
