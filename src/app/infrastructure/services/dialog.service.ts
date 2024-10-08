import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogParams } from "src/app/core/models/dialogParams.model";
import { MatConfirmDialogComponent } from "src/app/modules/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { MatConfirmCodeDialogComponent } from "src/app/modules/shared/mat-confirm-code-dialog/mat-confirm-code-dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {

  constructor(private dialog: MatDialog) {

  }

  openConfirmDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  openConfirmCodeDialog(msg: string, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmCodeDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }




}
