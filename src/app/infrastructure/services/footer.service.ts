import { environment } from './../../../environment.ts/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FooterRepository } from '../../core/repositories/footer.repository';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { FooterResponseModel } from '../../core/models/response/footerResponse.model';
import { ErrorResponseModel } from '../../core/models/response/responseError.model';
import { FooterMapper } from 'src/app/core/mappers/footer.mapper';
import { FooterResponseDto } from '../dto/response/footerResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class FooterService implements FooterRepository {

  http: HttpClient = inject(HttpClient);

  getFooter(programId: number): Observable<ResponseBaseModel<FooterResponseModel>> {
    return this.http.get<ResponseBaseModel<FooterResponseDto>>(`${environment.apiValepro}/program-api/api/v1/Footer/get-footer?ProgramId=${programId}`)
      .pipe(
        map((result: ResponseBaseModel<FooterResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: FooterMapper.mapResponseFooterDataApiToDomain(result.data)
        }
        )),
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

}
