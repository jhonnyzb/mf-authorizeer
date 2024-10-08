import { Observable } from "rxjs";
import { ResponseBaseModel } from "../models/response/responseBase.model";
import { UpdateUserPropertiesResponseModel } from "../models/response/updateUserFormResponse.model";
import { UpdateUserRequestModel } from "../models/request/updateUserFormRequest.model";
import { SaveUserRequestModel } from "../models/request/saveUserFormRequest.model";
import { PersonDataResponseModel } from "../models/response/personDataResponse.model";

export abstract class UserRepository {
  abstract getUpdateUserForm(userId: string, referenceTableId: number, isWebResponsive: boolean): Observable<ResponseBaseModel<UpdateUserPropertiesResponseModel>>;
  abstract updateUserForm(programId: UpdateUserRequestModel): Observable<ResponseBaseModel<null>>
  abstract saveUserForm(programId: SaveUserRequestModel): Observable<ResponseBaseModel<null>>
  abstract getUserData(personId: number): Observable<ResponseBaseModel<PersonDataResponseModel>>
}
