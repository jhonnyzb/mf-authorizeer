import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePasswordRequiredComponent } from './update-password-required/update-password-required.component';
import { ValidateCodeComponent } from './recover/validate-code/validate-code.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar sesión' } },
  { path: 'recover', component: RecoverComponent, data: { title: 'Recuperar contraseña' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Registro de usuarios' } },
  { path: 'update', component: UpdateComponent, data: { title: 'Actualizar contraseña' } },
  { path: 'update-password', component: UpdatePasswordRequiredComponent, data: { title: 'Actualizar contraseña' } },
  { path: 'validate-code', component: ValidateCodeComponent, data: { title: 'Validar código' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
