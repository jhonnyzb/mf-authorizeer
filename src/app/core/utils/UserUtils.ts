import { Injectable } from "@angular/core";
import { descrypt, encrypt } from "./sesion-util";
import { CuentasDto } from "src/app/infrastructure/dto/response/cuentas.dto";


@Injectable({
  providedIn: 'root'
})
export class UserUtils {
  userToken!: string;
  tokenExpires!: Date;
  roleId!: number;
  accountData!: CuentasDto;

  emitAccount(account: CuentasDto) {
    const miEvento = new CustomEvent('accountEvent', { detail: account });
    document.dispatchEvent(miEvento);
  }

  setUserRecoveryData(codeValidateModel: any) {
    sessionStorage.setItem("recoveryUserData", encrypt(JSON.stringify(codeValidateModel), 'recoveryUserData'));
  }

  public updateData() {
    if (this.userToken != null) {
      const tokenParts = this.userToken.split(/\./);
      const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
      this.tokenExpires = new Date(tokenDecoded.exp * 1000);
      this.roleId = parseInt(tokenDecoded.role);
    }
  }

  getUrlLogo() {
    return descrypt(sessionStorage.getItem("urlLogo") ?? '', 'urlLogo');
  }

  getProgramId() {
    return JSON.parse(descrypt(sessionStorage.getItem("programId") ?? '', 'programId') ?? '');
  }
  isExist() {
    let exist = false;
    if (sessionStorage.getItem("user")) {
      exist = true;
    }
    return exist;
  }

  exists() {
    return descrypt(sessionStorage.getItem("user") ?? '', 'user') && descrypt(sessionStorage.getItem("token") ?? '', 'token');
  }

  getToken(): any {
    if (sessionStorage.getItem("token")) {
      return descrypt(sessionStorage.getItem("token") ?? '', 'token') as string;
    }
  }
}
