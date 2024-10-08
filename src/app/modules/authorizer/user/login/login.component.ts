import { UserRepository } from 'src/app/core/repositories/user.respository';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UtilsTitle } from "src/app/core/utils/UtilsTitle";
import { MenuType } from "src/app/core/enum/enums";
import { FastMenuRepository } from "src/app/core/repositories/fast-menu.repository";
import { FastMenuListResponseModel } from "src/app/core/models/response/fastMenuListResponse.model";
import { FooterResponseModel } from "src/app/core/models/response/footerResponse.model";
import { ErrorResponseModel } from "src/app/core/models/response/responseError.model";
import { FooterRepository } from "src/app/core/repositories/footer.repository";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { LoginValeproRequestModel } from "src/app/core/models/request/loginValeproRequest.model";
import { AuthRepository } from "src/app/core/repositories/auth.repository";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { TopbarUtil } from "src/app/core/utils/TopbarUtil";
import { ConfigUtil } from "src/app/core/utils/ConfigUtil";
import { DialogParams } from "src/app/core/models/dialogParams.model";
import { getSession, saveSession } from "src/app/core/models/encryptData";
import { environment } from "src/environment.ts/environment";
import { GTMLogin } from "src/app/core/models/gtm-models/gtmLoginmodel";
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { ProductsModel } from 'src/app/core/models/response/products.model';
import { ParametersResponseModel } from 'src/app/core/models/response/parametersResponse.model';
import { ProgramsResponseModel } from 'src/app/core/models/response/programByIdResponse.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  anio: number = new Date().getFullYear();
  loginForm!: FormGroup;
  isPageLoaded: boolean = false;
  captcha = "";
  isLoading = false;
  submitted = false;
  AttemptsCaptcha = 0;
  defaultProgram = 6;
  defaultRole = 11;
  data!: LoginValeproRequestModel;
  keyCaptcha = environment.keyRecaptcha;
  captchaError = false;
  breakpoint: number = 0;
  hide = true;
  menuItems: any[];
  roles: any = [];
  programId: number = getSession<number>('programId');
  canRegister = getSession<boolean>('RegisterOnWebResponsive');
  copyright: string = '';
  intervalId!: number;

  constructor(
    private authRepository: AuthRepository,
    private router: Router,
    private configUtil: ConfigUtil,
    private dialogService: DialogService,
    private topbarUtil: TopbarUtil,
    private footerRepository: FooterRepository,
    private fastMenuRepository: FastMenuRepository,
    private utilsTitle: UtilsTitle,
    private userRepository: UserRepository,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl(this.defaultRole, [Validators.required]),
    });
    this.menuItems = [];
    this.copyright = localStorage.getItem('Copyright');
    this.utilsTitle.suscribeRoutesTitle();
    //Espera la señal del finalizado de la carga de los menus para redirigir al main
    document.addEventListener('isLoadFinished', (isFinished: any) => {
      if (isFinished.detail) {
        this.router.navigate(["/main"]);
      }
    });

    document.addEventListener('copyrightLoad', (copyright: CustomEvent<string>) => {
      if (copyright.detail) {
        this.copyright = copyright.detail
      }
    });
    document.addEventListener('programIsLoaded', () => {
      this.programId = getSession<number>('programId');
      this.canRegister = getSession<boolean>('RegisterOnWebResponsive');
      if (!this.programId) {
        this.programId = getSession<number>('programId');
      }
    });
  }

  ngOnInit(): void {
    this.programId = getSession<number>('programId');
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    //verificar si hay una sesión activa
    if (sessionStorage.getItem('accountValepro')) {
      this.router.navigateByUrl("/main");
    } else {
      this.configUtil.logout();
      this.router.navigate(['/login']);
    }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  resolved(token: string) {
    this.captcha = token;
  }
  goToRegister(){
    this.sendRegisterButtonGtmEvent()
    this.router.navigate(['/register']);
  }
  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.programId = getSession<number>('programId');
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.AttemptsCaptcha++;
      return;
    }

    if (this.captcha == "" || this.captcha == null) return;

    this.data = {
      User: this.loginForm.get("user")?.value,
      Pass: this.loginForm.get("password")?.value,
      ProgramId: getSession<number>('programId'),
    };

    if (!this.captcha) {
      let dialogParams: DialogParams = {
        success: false,
        msg: undefined,
        page: undefined,
        confirmText: ""
      };
      this.dialogService
        .openConfirmDialog("Por favor resuelva el reCaptcha.", dialogParams)
        .afterClosed()
        .subscribe((res) => { });
      return;
    }
    this.auth();
  }

  onKeypress(event: any) {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }



  auth() {
    this.programId = 6;
    this.isLoading = true;
    this.sendLoginGtmEvent(this.data);
    this.authRepository.loginValepro(this.data).subscribe({
      next: (resultRequest: ResponseBaseModel<LoginValeproResponseModel>) => {
        this.isLoading = false;
        let user = resultRequest.data.Roles.find(x => x.RoleId == 11);
        if (resultRequest.data.RequiredNewPassword) {
          this.router.navigate(['/update-password']);
          let params: DialogParams = {
            msg: '¡ Debes actualizar tu contraseña ! El código de verificación fue enviado a tu número de celular: ' + resultRequest.data.HiddenPhone + ' o al correo electrónico: ' + resultRequest.data.HiddenEmail,
            page: undefined,
            success: true,
            confirmText: ''
          }
          this.dialogService.openConfirmDialog(params.msg, params).afterClosed()
            .subscribe({
              next: (res) => {
                saveSession(this.data.User, 'username');
                this.router.navigate(['/update-password']);
              },
              error: (err) => {
              }
            });
          return;

        }
        else if (user == null) {
          let params: DialogParams = {
            msg: 'Rol no permitido',
            page: undefined,
            success: false,
            confirmText: ''
          }
          this.dialogService.openConfirmDialog(params.msg, params);
          return;
        }
        saveSession(resultRequest.data, 'accountValepro');
        this.getUserData(resultRequest.data);
        this.configUtil.setProgramId(this.programId);
        this.getParameters();
        this.getParameterHowDidIWin();
        this.getProducts();
        this.getProgramById();
      },
      error: (errorData: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.AttemptsCaptcha++;
        this.isLoading = false;
        let dialogParams: DialogParams = {
          success: false,
          msg: errorData.data[0].ErrorMessage,
          page: undefined,
          confirmText: ""
        };
        this.dialogService.openConfirmDialog(dialogParams.msg, dialogParams);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getParameters(){
    this.authRepository.getParameters(this.programId, 296).subscribe({
      next: (response: ResponseBaseModel<ParametersResponseModel>) => {
        saveSession(response.data.ParametersList[0], 'TycRedemption');
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error)
      }
    })
  }

  getParameterHowDidIWin(){
    this.authRepository.getParameters(this.programId, 299).subscribe({
      next: (response: ResponseBaseModel<ParametersResponseModel>) => {
        saveSession(response.data.ParametersList[0], 'HOW_DID_I_WIN');
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error)
      }
    })
  }

  getProgramById(){
    this.authRepository.getProgramById().subscribe({
      next: (response: ResponseBaseModel<ProgramsResponseModel>) => {
        saveSession(response.data, 'ProgramById');
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error)
      }
    })
  }

  getUserData(userLogin: LoginValeproResponseModel) {
    this.userRepository.getUserData(userLogin.PersonId).subscribe({
      next: (response: ResponseBaseModel<PersonDataResponseModel>) => {
        saveSession(response.data, 'userData')
        const miEvento = new CustomEvent('userDataEvent', { detail: response.data });
        document.dispatchEvent(miEvento);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      },
      complete: () => {
        this.getFooter(this.programId);
      }
    })
  }


  getFooter(programId: number) {
    this.footerRepository.getFooter(programId).subscribe({
      next: (response: ResponseBaseModel<FooterResponseModel>) => {
        saveSession(response.data, 'formFooter')
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);

      },
      complete: () => {
        this.getPreviousMenu();
      }
    });
  }

  getPreviousMenu() {
    this.fastMenuRepository.getMenu(this.programId, MenuType.fastMenu).subscribe({
      next: (response: ResponseBaseModel<FastMenuListResponseModel>) => {
        saveSession(response.data.GetQuickMenu, 'fastMenu')
        this.topbarUtil.loadMenu(response.data.GetQuickMenu);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      },
      complete: () => {
        this.getProfileMenu();
      }
    });
  }
  getProfileMenu() {
    this.fastMenuRepository.getMenu(this.programId, MenuType.profileMenu).subscribe({
      next: (response: ResponseBaseModel<FastMenuListResponseModel>) => {
        saveSession(response.data.GetQuickMenu, 'menuProfile')
        this.topbarUtil.loadMenu(response.data.GetQuickMenu);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      },
      complete: () => {
        const isLoadFinishedEvent = new CustomEvent('isLoadFinished', { detail: true });
        document.dispatchEvent(isLoadFinishedEvent);
      }
    });
  }
  toggleHide() {
    this.hide = !this.hide;
  }

  getProducts() {
    const filter: FilterProductsModel = {
      Mode: 1,
      CatalogueIds: [],
      ProductName: null,
      CategoryIds: [],
      PointsOrderType: null,
      MinimumPoints: null,
      MaximumPoints: null,
      Page: 1,
      PageSize: 12
    };
    this.fastMenuRepository.getProducts(filter).subscribe({
      next: (resp:ResponseBaseModel<ProductsModel>) => {
        saveSession(resp.data.Products.Data, 'l-f-products');
       },
      error: (error) => { 
        saveSession([], 'l-f-products');
      }
    })
  }
  sendLoginGtmEvent(data: LoginValeproRequestModel) {
    let event: GTMLogin = {
      event: 'login',
      ParameterTarget: 'login',
      ParameterType: 'button',
      IDPerson: '',
      UserName: data.User,
      IDProgram: this.programId,
      IDAccount: 0,
      ParameterText: 'Ingresar'
    }
    this.gtmEventRepository.sendEvent(event);

  }
  sendRegisterButtonGtmEvent(){
    let event: GTMSelectContent = {
      event: 'Select_content',
      ParameterTarget: 'Home',
      ParameterType: 'button',
      ParameterCategory: 'Registro Vale Pro',
      IDAccount: 0,
      UserName: '',
      IDProgram: this.programId,
      IDPerson: 0,
      ParameterText: 'Registro',
      ParameterItemID: '',
    }
    this.gtmEventRepository.sendEvent(event);
  }
}
