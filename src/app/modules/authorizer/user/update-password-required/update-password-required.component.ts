import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogParams } from 'src/app/core/models/dialogParams.model';
import { getSession } from 'src/app/core/models/encryptData';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { GenerateCodeRequestModel, GenerateCodeResponseModel } from 'src/app/core/models/request/generateCodeRequest.model';
import { ValidateCodeRequestModel, ValidateCodeResponseModel } from 'src/app/core/models/request/validateCode.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';

@Component({
  selector: 'app-update-password-required',
  templateUrl: './update-password-required.component.html',
  styleUrls: ['./update-password-required.component.scss']
})
export class UpdatePasswordRequiredComponent {
  logo: string = '';
  hide = true;
  hide1 = true;
  codeCompleteControl: string = '';
  anio: number = new Date().getFullYear();
  showError: boolean = false;
  date = new Date('2020-01-01 00:05');
  minutes: string = '';
  seconds: string = '';
  colorbackground: string = '';
  btnColor: string = '';
  updateForm!: FormGroup;
  showResend: boolean = false;
  emptyCode: boolean = false;
  invalidCode: boolean = false;
  minPassword = localStorage.getItem('PasswordLength');

  //#region Injectable
  router = inject(Router);
  dialogService = inject(DialogService);
  authRepository = inject(AuthRepository);
  toastService = inject(ToastrService);
  recoverRepository = inject(AuthRepository);
  gtmEventRepository= inject(GtmDispatchEventsRepository);

  //#endregion



  ngOnInit(): void {
    this.createForm();
    this.countDown();
  }

  createForm() {
    this.updateForm = new FormGroup({
      Pass: new FormControl('', [Validators.required]),
      NewPass: new FormControl('', [Validators.required]),
    });
  }

  get codeComplete(): AbstractControl | null {
    return this.updateForm.get('codeComplete');
  }

  onCodeCompleted(code: string): void {
    this.codeCompleteControl = code;

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


  countDown(): void {
    let padLeft = (n: any) => '00'.substring(0, '00'.length - n.length) + n;
    let interval = setInterval(() => {
      this.minutes = this.date.getMinutes() + '';
      this.seconds = padLeft(this.date.getSeconds() + '');
      this.date = new Date(this.date.getTime() - 1000);
      if (this.minutes === '0' && this.seconds === '00') {
        clearInterval(interval);
        this.date = new Date('2020-01-01 00:05');
        this.showResend = true;
      }
      if (this.router.url !== '/update-password') {
        clearInterval(interval);
      }
    }, 1000);
  }

  confirmPassword() {
    this.emptyCode = false;
    if (this.codeCompleteControl.length == 0) {
      this.emptyCode = true;
      return;
    }
    if (this.codeCompleteControl.length < 6) {
      let dialogParams: DialogParams = {
        page: undefined,
        msg: undefined,
        success: false,
        confirmText: ''
      };
      this.dialogService.openConfirmDialog(
        'Código incorrecto', dialogParams);
      return;
    }

    if (this.updateForm.get('Pass')?.value != this.updateForm.get('NewPass')?.value) {
      let dialogParams: DialogParams = {
        page: undefined,
        msg: undefined,
        success: false,
        confirmText: ''
      };
      this.dialogService.openConfirmDialog(
        'Las contraseñas no coinciden', dialogParams);
      return;
    }

    if (!this.updateForm.get('Pass')?.value || !this.updateForm.get('NewPass')?.value) {
      let dialogParams: DialogParams = {
        page: undefined,
        msg: undefined,
        success: false,
        confirmText: ''
      };
      this.dialogService.openConfirmDialog(
        'La información ingresada no es válida.', dialogParams);
      return;
    }
    this.sendCodeValidate();

  }




  sendCodeValidate() {
    let dataGtm: GenerateCodeRequestModel = {
      UserName: getSession<string>('username'),
      ProgramId: getSession<number>('programId'),
    }
    let data: ValidateCodeRequestModel = {
      userName: getSession<string>('username'),
      programId: getSession<number>('programId'),
      newPassword: this.updateForm.get('Pass')?.value,
      newPasswordVerified: this.updateForm.get('NewPass')?.value,
      confirmationCode: this.codeCompleteControl
    };
    this.authRepository.validateCode(data).subscribe({
      next: (res: ResponseBaseModel<ValidateCodeResponseModel>) => {
        let dialogParams: DialogParams = {
          page: undefined,
          msg: undefined,
          success: true,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog(
          '¡Tu contraseña fue cambiada con éxito!', dialogParams);
        this.router.navigate(['/login']);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        let res = error;
        if (error.data[0].ErrorCode == "1042") {
          this.invalidCode = true;
        }
        if (res.codeId == 400) {
          let dialogParams: DialogParams = {
            page: undefined,
            msg: undefined,
            success: false,
            confirmText: ''
          };
          this.dialogService.openConfirmDialog(
            res.data[0].ErrorMessage, dialogParams);
        } else {
          let dialogParams: DialogParams = {
            page: undefined,
            msg: undefined,
            success: false,
            confirmText: ''
          };
          this.dialogService.openConfirmDialog(
            error.message, dialogParams);
        }

      },
    });
  }

  resendCode() {
    let data: GenerateCodeRequestModel = {
      UserName: getSession<string>('user'),
      ProgramId: getSession<number>('programId'),
    }
    this.authRepository.generateCode(data).subscribe({
      next: (res: ResponseBaseModel<GenerateCodeResponseModel>) => {
        let dialogParams: DialogParams = {
          page: undefined,
          msg: undefined,
          success: false,
          confirmText: ''
        };
        this.showResend = false;
        this.dialogService.openConfirmDialog(
          "El código de verificación fue enviado a tu número de celular: " + res.data.Phone + ' o al correo electrónico: ' + res.data.Email, dialogParams);

        this.countDown();
      },
      error: (error) => {
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

  sendValidateCodeGtmEvent(){
    let event: GTMSelectContent = {
      event: 'Select_content',
      ParameterTarget: 'Home',
      ParameterType: 'button',
      ParameterCategory: 'New Password Vale Pro',
      IDAccount: 0,
      UserName: getSession<string>('username'),
      IDProgram: getSession<number>('programId'),
      IDPerson: 0,
      ParameterText: 'Confirmar',
      ParameterItemID: '',
    }
    this.gtmEventRepository.sendEvent(event);
  }

}
