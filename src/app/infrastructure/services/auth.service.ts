import { LoginValeproRequestModel } from './../../core/models/request/loginValeproRequest.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { LoginValeproResponseModel } from '../../core/models/response/loginValeproResponse.model';
import { ErrorResponseModel } from '../../core/models/response/responseError.model';
import { GenerateCodeRequestModel, GenerateCodeResponseModel } from '../../core/models/request/generateCodeRequest.model';
import { ValidateCodeRequestModel, ValidateCodeResponseModel } from '../../core/models/request/validateCode.model';
import { AuthRepository } from '../../core/repositories/auth.repository';
import { ConfigRegisterFormRequestModel } from '../../core/models/response/configRegisterFormRequest.model';
import { LoginValeproRequestDto } from '../dto/request/loginValeproRequest.dto';
import { LoginValeproResponseDto } from '../dto/response/loginValeproResponse.dto';
import { AuthMapper } from 'src/app/core/mappers/auth.mapper';
import { environment } from 'src/environment.ts/environment';
import { ConfigRegisterFormRequestDto } from '../dto/response/configRegisterFormRequest.dto';
import { GenerateCodeResponseDto } from '../dto/response/generateCodeResponse.dto';
import { ValidateCodeResponseDTO } from '../dto/response/validateCode.dto';
import { ParametersResponseModel } from 'src/app/core/models/response/parametersResponse.model';
import { ParametersResponseDto } from '../dto/response/parametersResponse.dto';
import { ProgramsResponseModel } from 'src/app/core/models/response/programByIdResponse.model';
import { ProgramsResponseDto } from '../dto/response/programByIdResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthRepository {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  loginValepro(model: LoginValeproRequestModel): Observable<ResponseBaseModel<LoginValeproResponseModel>> {
    let request: LoginValeproRequestDto  = AuthMapper.loginDomainToApi(model);
    return this.http.post<ResponseBaseDto<LoginValeproResponseDto>>(`${environment.apiValepro}/auth-public-api/api/v1/login/login-administrator`, request).pipe(
      map((response)=> {
        return {
          codeId: response.codeId,
          message: response.message,
          data: AuthMapper.mapLoginApiToDomain(response.data)
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

  register(registerData: any): Observable<ResponseBaseModel<any>> {
    let request =  AuthMapper.domainToApiRegister(registerData);
    return this.http.post<ResponseBaseDto<any>>(`${environment.apiValepro}/auth-public-api/api/v1/login/login-administrator`, request).pipe(
      map((response)=> {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data
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

  getConfigFormRegister(programId: number, ReferenceTableId:number): Observable<ResponseBaseModel<ConfigRegisterFormRequestModel>> {
    return this.http.get<ResponseBaseModel<ConfigRegisterFormRequestDto>>(`${environment.apiValepro}/program-public-api/api/v1/FormManagement/attributes-configuration-form?ProgramId=${programId}&ReferenceTableId=${ReferenceTableId}`).
    pipe(
      map((response)=> {
        return {
          codeId: response.codeId,
          message: response.message,
          data: AuthMapper.configFormApiToDomain(response.data)
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

  generateCode(requestModel: GenerateCodeRequestModel): Observable<ResponseBaseModel<GenerateCodeResponseModel>> {
    let request = AuthMapper.generateCodeFromDomainToApi(requestModel);
    return this.http.post<ResponseBaseDto<GenerateCodeResponseDto>>(`${environment.apiValepro}/auth-public-api/api/v1/user/reset-password-and-send-code`, request)
      .pipe(
        map((data: ResponseBaseDto<GenerateCodeResponseDto>) => {
          return {
            codeId: data.codeId,
            data: AuthMapper.generateCodeFromApiToDomain(data.data),
            message: data.message
          }
        })
      );
  }

  validateCode(requestModel: ValidateCodeRequestModel): Observable<ResponseBaseModel<ValidateCodeResponseModel>> {
    let request = AuthMapper.validateCodeFromDomainToApi(requestModel);
    return this.http.post<ResponseBaseModel<ValidateCodeResponseDTO>>(`${environment.apiValepro}/auth-public-api/api/v1/user/change-password-with-code`, request)
      .pipe(
        map((data: ResponseBaseModel<ValidateCodeResponseDTO>) => ({
          codeId: data.codeId,
          data: AuthMapper.validateCodeFromApiToDomain(data.data),
          message: data.message
        })),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = new ResponseBaseModel<ErrorResponseModel[]>(
            error.error.CodeId,
            error.error.Message,
            error.error.Data as ErrorResponseModel[]
          );
          return throwError(() => errorResponse);
        }));
  }
  getParameters(programId: number, conceptId: number): Observable<ResponseBaseModel<ParametersResponseModel>> {
    return this.http.get<ResponseBaseModel<ParametersResponseDto>>(`${environment.apiValepro}/program-api/api/v1/Parameters/get-list?ProgramId=${programId}&ConceptId=${conceptId}`)
      .pipe(
        map((result: ResponseBaseModel<ParametersResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: AuthMapper.parametersFromApiToDomain(result.data)
        })),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          };
          return throwError(() => errorResponse);
        })
      );
  }

  getProgramById(): Observable<ResponseBaseModel<ProgramsResponseModel>> {
    return this.http.get<ResponseBaseModel<ProgramsResponseDto>>(`${environment.apiValepro}/program-api/api/v1/program/get-program-by-id`)
      .pipe(
        map((result: ResponseBaseModel<ProgramsResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: AuthMapper.programsByIdFromApiToDomain(result.data)
        })),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          };
          return throwError(() => errorResponse);
        })
      );
  }
}
