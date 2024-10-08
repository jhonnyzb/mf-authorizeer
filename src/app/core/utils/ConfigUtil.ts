import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { descrypt, encrypt } from "./sesion-util";
import { environment } from "src/environment.ts/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigUtil {
  defaultProgram = 6;
  userToken!: string | null;
  constructor(
    private router: Router,
    private http: HttpClient) { }

  urlChangeEmit() {
    const miEvento = new CustomEvent('urlChangeEmit');
    document.dispatchEvent(miEvento);
  }

  contentChangeEmit() {
    const miEvento = new CustomEvent('contentChangeEmit');
    document.dispatchEvent(miEvento);
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('user');
  }

  logout() {
    this.userToken = null;
    localStorage.setItem('programId', sessionStorage.getItem('programId'))
    localStorage.setItem('program', sessionStorage.getItem('program'))
    localStorage.setItem('RegisterOnWebResponsive', sessionStorage.getItem('RegisterOnWebResponsive'))
    localStorage.setItem('configVisual', sessionStorage.getItem('configVisual'))
    localStorage.setItem('passwordMinlength', sessionStorage.getItem('passwordMinlength'))
    sessionStorage.clear();
    sessionStorage.setItem('program', localStorage.getItem('program'));
    sessionStorage.setItem('programId', localStorage.getItem('programId'));
    sessionStorage.setItem('RegisterOnWebResponsive', localStorage.getItem('RegisterOnWebResponsive'));
    sessionStorage.setItem('configVisual', localStorage.getItem('configVisual'));
    sessionStorage.setItem('passwordMinlength', localStorage.getItem('passwordMinlength'));
    localStorage.removeItem('program');
    localStorage.removeItem('programId');
    this.router.navigate(['/login']);
  }

  setProgramId(programId: any) {
    sessionStorage.setItem("programId", encrypt(programId.toString(), 'programId'));
    const isLoadFinishedEvent = new CustomEvent('isLoadFinished');
    document.dispatchEvent(isLoadFinishedEvent);
  }

  setUrlLogo(url: string) {
    sessionStorage.setItem("urlLogo", encrypt(url, 'urlLogo'));
  }

  setUrl(url: string, name: string) {
    sessionStorage.setItem(
      "urlSaved",
      encrypt(JSON.stringify({ url: url, name: name }), 'urlSaved')
    );
    this.urlChangeEmit();
  }

  getUrl() {
    let savedData: {
      url: string;
      name: string;
    };
    savedData = descrypt(sessionStorage.getItem("urlSaved") ?? '', 'urlSaved');
    return savedData;
  }

  setSendUpdateCode(value: any) {
    sessionStorage.setItem("updateCode", encrypt(value.toString(), 'updateCode'));
  }

  getSendUpdateCode() {
    if (descrypt(sessionStorage.getItem("updateCode") ?? '', 'updateCode') != null) {
      return true;
    }
    this.router.navigateByUrl("/login");
    return false;
  }
}
