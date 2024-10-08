import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { CodeInputModule } from 'angular-code-input';
import { UpdateComponent } from './update/update.component';
import { UpdatePasswordRequiredComponent } from './update-password-required/update-password-required.component';
import { ValidateCodeComponent } from './recover/validate-code/validate-code.component';
import { ToastrService } from 'ngx-toastr';
import { ImageLoginComponent } from './image-login/image-login.component';
import { BackgroundLoginComponent } from './background-login/background-login.component';
import { UiModule } from '../../shared/ui.module';
import { SharedModule } from '../../shared/shared.module';
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';
import { UtilsModule } from 'src/app/core/utils/utils.module';


@NgModule({
  declarations: [
    LoginComponent,
    RecoverComponent,
    UpdateComponent,
    RegisterComponent,
    UpdatePasswordRequiredComponent,
    ValidateCodeComponent,
    ImageLoginComponent,
    BackgroundLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    UiModule,
    RecaptchaModule,
    SharedModule,
    UtilsModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      code: ''
    })
  ],
  providers: [
    {
      provide: ToastGenericRepository,
      useClass: ToastrService,
    },
  ]
})
export class UserModule { }
