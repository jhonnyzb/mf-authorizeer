import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-mat-confirm-code-dialog',
  templateUrl: './mat-confirm-code-dialog.component.html',
  styleUrls: ['./mat-confirm-code-dialog.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class MatConfirmCodeDialogComponent {

  dialogIcon = "../../../../assets/img/check-paticipated-completed.svg";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmCodeDialogComponent>,
  ) { }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
