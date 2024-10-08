import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { DialogParams } from 'src/app/core/models/dialogParams.model';
import { getSession } from 'src/app/core/models/encryptData';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { GenerateCodeRequestModel, GenerateCodeResponseModel } from 'src/app/core/models/request/generateCodeRequest.model';
import { ValidateCodeRequestModel, ValidateCodeResponseModel } from 'src/app/core/models/request/validateCode.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss']
})
export class ValidateCodeComponent {
  logo: string = '';
  hide = true;
  hide1 = true;
  recoverForm!: FormGroup;
  anio: number = new Date().getFullYear();
  showError: boolean = false;
  minutes!: string;
  seconds!: string;
  private subscription!: Subscription;
  colorbackground: string = '';
  btnColor: string = '';
  codeCompleteControl: string = '';
  username: string = '';
  showResend: boolean = false;
  emptyCode: boolean = false;
  invalidCode: boolean = false;
  minPassword = localStorage.getItem('PasswordLength');
  //#region Injectables
  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  recoverRepository: AuthRepository = inject(AuthRepository);
  toastService: ToastrService = inject(ToastrService);
  toastGenericRepository: ToastGenericRepository = inject(ToastGenericRepository);
  gtmEventRepository= inject(GtmDispatchEventsRepository);

  //#endregion


  ngOnInit(): void {
    this.createForm();
    this.countDown();
    this.username = getSession<string>('username');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  createForm() {
    this.recoverForm = new FormGroup({
      Pass: new FormControl('', [Validators.required]),
      NewPass: new FormControl('', [Validators.required]),
    });
  }

  get codeComplete(): AbstractControl | null {
    return this.recoverForm.get('codeComplete');
  }

  onCodeCompleted(code: any): void {
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


  countDown() {
    let countdown = 5 * 60;
    this.subscription = interval(1000).subscribe(x => {
      countdown--;
      this.minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
      this.seconds = (countdown - parseInt(this.minutes) * 60).toString().padStart(2, '0');
      if (countdown <= 0) {
        this.subscription.unsubscribe();
      }

    });
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

    if (this.recoverForm.get('Pass')?.value != this.recoverForm.get('NewPass')?.value) {
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


    if (!this.recoverForm.get('Pass')?.value || !this.recoverForm.get('NewPass')?.value) {
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
    let data: ValidateCodeRequestModel = {
      userName: this.username,
      programId: getSession<number>('programId'),
      newPassword: this.recoverForm.get('Pass')?.value,
      newPasswordVerified: this.recoverForm.get('NewPass')?.value,
      confirmationCode: this.codeCompleteControl
    };
    this.recoverRepository.validateCode(data).subscribe({
      next: (res: ResponseBaseModel<ValidateCodeResponseModel>) => {
        let dialogParams: DialogParams = {
          page: undefined,
          msg: undefined,
          success: true,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog('¡Tu contraseña fue cambiada con éxito!', dialogParams);
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
      UserName: this.username,
      ProgramId: getSession<number>('programId'),
    }
    this.recoverRepository.generateCode(data).subscribe({
      next: (res: ResponseBaseModel<GenerateCodeResponseModel>) => {
        let dialogParams: DialogParams = {
          page: "",
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
          'Lo sentimos, ha ocurrido un error inesperado en el sistema. Por favor, inténtalo de nuevo más tarde.', dialogParams);

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
      UserName: this.username,
      IDProgram: getSession<number>('programId'),
      IDPerson: 0,
      ParameterText: 'Confirmar',
      ParameterItemID: '',
    }
    this.gtmEventRepository.sendEvent(event);
  }
}
