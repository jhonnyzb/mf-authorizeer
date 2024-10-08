import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { descrypt, encrypt } from "./sesion-util";
import { GetQuickMenuModel } from "../models/response/fastMenuListResponse.model";
import { getSession } from "../models/encryptData";
import { CuentasDto } from "src/app/infrastructure/dto/response/cuentas.dto";

@Injectable({
  providedIn: 'root'
})
export class TopbarUtil {


  loadMenu(data: GetQuickMenuModel) {
    const menuEvent = new CustomEvent('menuEvent', { detail: data });
    document.dispatchEvent(menuEvent);
  }

  loadMenuProfile(data: any) {
    const menuProfileEvent = new CustomEvent('menuProfileEvent', { detail: data });
    document.dispatchEvent(menuProfileEvent);
  }

  isLoadFinished(data: boolean) {
    let account = getSession<CuentasDto>('account') ?? undefined;
    const waitForAccount = async () => {
      while (!account) {
        await this.delay(100);
        account = getSession<CuentasDto>('account');
      }
      const isLoadFinishedEvent = new CustomEvent('isLoadFinished', { detail: data });
      document.dispatchEvent(isLoadFinishedEvent);
    };
    waitForAccount();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  setMenuSessionStorage(data: any) {
    sessionStorage.setItem("menu", encrypt(JSON.stringify(data), 'menu'));
    this.loadMenu(data)
  }

  setMenuProfileSessionStorage(data: any) {
    sessionStorage.setItem("menuProfile", encrypt(JSON.stringify(data), 'menuProfile'));
    this.loadMenuProfile(data);
  }

  getMenuSessionStorage() {
    let me = {};
    if (sessionStorage.getItem("menu")) {
      me = descrypt(sessionStorage.getItem("menu") ?? '', 'menu');
    }
    return me;
  }
  getMenuProfileSessionStorage() {
    let me = {};
    // && sessionStorage.getItem("token")
    if (sessionStorage.getItem("menuProfile")) {
      me = descrypt(sessionStorage.getItem("menuProfile") ?? '', 'menuProfile');
    }
    return me;
  }

  setFormHeader(response: any) {
    sessionStorage.setItem("formHeader", encrypt(JSON.stringify(response), 'formHeader'));
  }

  getFormHeader() {
    let me: any = null;
    if (sessionStorage.getItem("formHeader")) {
      me = descrypt(sessionStorage.getItem("formHeader") ?? '', 'formHeader');
    }
    return me;
  }

  setCategoriesLocal(categories: any) {
    sessionStorage.setItem("categories", encrypt(JSON.stringify(categories), 'categories'));
    this.isLoadFinished(true);
  }

  getCategoriesLocal() {
    let result: any = [];
    if (sessionStorage.getItem("categories")) {
      result = descrypt(sessionStorage.getItem("categories") ?? '', 'categories');
    }
    return result;
  }

  getCategorieLocalById(categoryId: number) {
    let result: any = undefined;
    let categories = this.getCategoriesLocal();
    if (categories.Data.length > 0) {
      categories.Data.forEach((category: any) => {
        if (category.CategoryId == categoryId) {
          result = category;
          return result;
        }
      });
    }
    return result;
  }

}
