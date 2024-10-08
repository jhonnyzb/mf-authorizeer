import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { descrypt, encrypt } from "../../core/utils/sesion-util";
import { ResponseBaseModel } from "../../core/models/response/responseBase.model";
import { ResponseBaseDto } from "../dto/response/responseBase.dto";
import { UpdateUserPropertiesResponseDto } from "../dto/response/updateUserFormResponse.dto";
import { ErrorResponseModel } from "../../core/models/response/responseError.model";
import { UpdateUserPropertiesResponseModel } from '../../core/models/response/updateUserFormResponse.model';
import { UserRepository } from '../../core/repositories/user.respository';
import { UpdateUserRequestModel } from '../../core/models/request/updateUserFormRequest.model';
import { SaveUserRequestModel } from 'src/app/core/models/request/saveUserFormRequest.model';
import { UserMapper } from 'src/app/core/mappers/user.mapper';
import { CuentasDto } from '../dto/response/cuentas.dto';
import { environment } from 'src/environment.ts/environment';
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';





@Injectable({
  providedIn: "root",
})
export class UserService implements UserRepository {
  public accountData!: CuentasDto;

  constructor(
    private http: HttpClient,
  ) { }

  getUpdateUserForm(userId: string, referenceTableId: number, isWebResponsive: boolean): Observable<ResponseBaseModel<UpdateUserPropertiesResponseModel>> {
    return this.http.get<ResponseBaseDto<UpdateUserPropertiesResponseDto>>(`${environment.apiValepro}/affiliations-api/api/v1/affiliated/get-affiliated-user?userId=${userId}&referenceTableId=${referenceTableId}&isWebResponsive=${isWebResponsive}`).
      pipe(
        map((response) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: UserMapper.configFormApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.CodeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }

  getUserData(personId: number): Observable<ResponseBaseModel<PersonDataResponseModel>> {
    return this.http.get<ResponseBaseDto<PersonDataResponseModel>>(`${environment.apiValepro}/affiliations-api/api/v1/user/get-user-data?personId=${personId}`).
      pipe(
        map((response) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: UserMapper.mapPersonDataResponseDtoToModel(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }

  updateUserForm(data: UpdateUserRequestModel): Observable<ResponseBaseModel<any>> {
    let request = UserMapper.updateUserFormDomainToApi(data)
    return this.http.put<ResponseBaseModel<null>>(`${environment.apiValepro}/affiliations-api/api/v1/affiliated/update-affiliated-user`, request)
      .pipe(
        map((data: ResponseBaseModel<any>) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }

  saveUserForm(data: SaveUserRequestModel): Observable<ResponseBaseModel<null>> {
    let request = UserMapper.saveUserFormDomainToApi(data)

    return this.http.post<ResponseBaseModel<null>>(`${environment.apiValepro}/affiliations-public-api/api/v1/affiliated/save-affiliated-user`, request)
      .pipe(
        map((data: ResponseBaseModel<null>) => {
          return data;

        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.CodeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }
  exists() {
    return descrypt(sessionStorage.getItem("user") ?? '', 'user');
  }

  setUrlLogo(url: string) {
    sessionStorage.setItem('urlLogo', encrypt(url, 'urlLogo'));
  }

  getUrlLogo() {
    return descrypt(sessionStorage.getItem('urlLogo') ?? '', 'urlLogo');
  }

  setProgramId(programId: any) {
    sessionStorage.setItem('programId', encrypt(programId, 'programId'));
  }

  getProgramId() {
    return descrypt(sessionStorage.getItem('programId') ?? '', 'programId');
  }
  setAccountData(data: CuentasDto, isEmit: boolean = true) {
    sessionStorage.setItem('account', encrypt(JSON.stringify(data), 'account'));
    this.accountData = data;
    if (isEmit) {
      this.accountSave();
    }
  }
  async accountSave() {
    this.emitAccount(this.accountData);
  }

  emitAccount(account: CuentasDto) {
    const miEvento = new CustomEvent('accountEvent', { detail: account });
    document.dispatchEvent(miEvento);
  }

  update(data: any) {
    sessionStorage.setItem('user', encrypt(JSON.stringify(data), 'user'));
  }
  getIdPerson() {
    let me = '';
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      me = JSON.parse(descrypt(sessionStorage.getItem('user') ?? '', 'user') ?? '').personId;
    }

    return me;
  }

  isExist() {
    let exist = false;
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      exist = true;
    }
    return exist;
  }
  token() {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      return descrypt(sessionStorage.getItem('token') ?? '', 'token');
    }
    return null;
  }

}
