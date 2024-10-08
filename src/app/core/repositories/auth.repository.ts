import { Observable } from "rxjs";
import { ResponseBaseModel } from "../models/response/responseBase.model";
import { LoginValeproRequestModel } from "../models/request/loginValeproRequest.model";
import { LoginValeproResponseModel } from "../models/response/loginValeproResponse.model";
import { GenerateCodeRequestModel, GenerateCodeResponseModel } from "../models/request/generateCodeRequest.model";
import { ValidateCodeRequestModel, ValidateCodeResponseModel } from "../models/request/validateCode.model";
import { ConfigRegisterFormRequestModel } from "../models/response/configRegisterFormRequest.model";
import { ParametersResponseModel } from "../models/response/parametersResponse.model";
import { ProgramsResponseModel } from "../models/response/programByIdResponse.model";


export abstract class AuthRepository {
  abstract loginValepro(model: LoginValeproRequestModel): Observable<ResponseBaseModel<LoginValeproResponseModel>>
  abstract generateCode(requestModel: GenerateCodeRequestModel): Observable<ResponseBaseModel<GenerateCodeResponseModel>>
  abstract validateCode(requestModel: ValidateCodeRequestModel): Observable<ResponseBaseModel<ValidateCodeResponseModel>>
  abstract register(registerModel: any): Observable<ResponseBaseModel<any>>
  abstract getConfigFormRegister(programId: number, ReferenceTableId: number): Observable<ResponseBaseModel<ConfigRegisterFormRequestModel>>
  abstract getParameters(programId: number, conceptId: number): Observable<ResponseBaseModel<ParametersResponseModel>> 
  abstract getProgramById(): Observable<ResponseBaseModel<ProgramsResponseModel>>
  
}
