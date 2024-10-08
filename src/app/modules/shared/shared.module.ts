
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CodeInputModule } from "angular-code-input";

import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { UiModule } from "./ui.module";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [

    MatConfirmDialogComponent,

  ],
  exports: [

    MatConfirmDialogComponent,

  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      code: ''
    }),
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
