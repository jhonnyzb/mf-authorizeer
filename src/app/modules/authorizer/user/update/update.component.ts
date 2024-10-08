import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { AuthRepository } from "src/app/core/repositories/auth.repository";
import { GenerateCodeRequestModel, GenerateCodeResponseModel } from "src/app/core/models/request/generateCodeRequest.model";
import { getSession, saveSession } from "src/app/core/models/encryptData";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { GTMForgotPassword } from "src/app/core/models/gtm-models/gtmForgotPassword.model";
import { DialogParams } from "src/app/core/models/dialogParams.model";
import { environment } from "src/environment.ts/environment";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {

  keyCaptcha = environment.keyRecaptcha;
  logo: string = '';
  submitted = false;
  captcha = "";
  hide = true;
  hide1 = true;
  colorbackground: string = '';
  btnColor: string = '';
  GenerateForm!: FormGroup;
  mostrarMensajeError: boolean = false;

  //#region Injectable
  router = inject(Router);
  dialogService = inject(DialogService);
  authRepository = inject(AuthRepository);
  toastService = inject(ToastrService);
  formBuilder = inject(FormBuilder);
  gtmEventRepository= inject(GtmDispatchEventsRepository);

  //#endregion


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.GenerateForm = this.formBuilder.group({
      Id: ['', [Validators.required]],
    });
  }


  resolved(token: string) {
    this.captcha = token;
  }

  onInputFocus(hide: boolean) {
    if (hide === this.hide1) {
      this.hide1 = true;
    } else {
      this.hide = true;
    }
  }

  onInputBlur(hide: boolean) {
    if (hide === this.hide1) {
      this.hide1 = false;
    } else {
      this.hide = false;
    }
  }

  onSubmit() {

    if (!this.GenerateForm.get('Id')?.value) {
      let dialogParams: DialogParams = {
        page: undefined,
        msg: undefined,
        success: false,
        confirmText: ''
      };
      this.dialogService.openConfirmDialog(
        'Todos los campos son requeridos', dialogParams);
      return;
    }

    if (this.captcha === '') {
      this.mostrarMensajeError = true;
      return;
    }
    this.navigate();
  }


  navigate() {
    let data: GenerateCodeRequestModel = {
      UserName: this.GenerateForm.get('Id')?.value,
      ProgramId: getSession<number>('programId'),
    }

    this.authRepository.generateCode(data).subscribe({
      next: (res: ResponseBaseModel<GenerateCodeResponseModel>) => {
        this.sendUpdateGtmEvent(res.data.UserName)
        this.sendPopUp(res.data.Phone, res.data.Email);
        saveSession(data.UserName, 'username')
        this.router.navigate(['/update-password']);
      },
      error: (error: HttpErrorResponse) => {
        let dialogParams: DialogParams = {
          page: undefined,
          msg: undefined,
          success: false,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog(
          error.error.Data[0].ErrorMessage, dialogParams);
        //pop up de error
      },
    });
  }

  sendPopUp(phone: number, email: string) {
    let dialogParams: DialogParams = {
      page: undefined,
      msg: undefined,
      success: false,
      confirmText: ''
    };
    this.dialogService.openConfirmCodeDialog(
      "a tu número de celular: " + phone + ' o al correo electrónico: ' + email, dialogParams);
  }

  sendUpdateGtmEvent(user: string){
    let event: GTMSelectContent = {
      event: 'Select_content',
      ParameterTarget: 'Home',
      ParameterType: 'button',
      ParameterCategory: 'Update Password Vale Pro',
      IDAccount: 0,
      UserName: user,
      IDProgram: getSession<number>('programId'),
      IDPerson: 0,
      ParameterText: 'Obtener código',
      ParameterItemID: '',
    }
    this.gtmEventRepository.sendEvent(event);
  }


}
