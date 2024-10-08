import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FastMenuRepository } from '../../core/repositories/fast-menu.repository';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { ErrorResponseModel } from '../../core/models/response/responseError.model';
import { FastMenuListResponseModel } from '../../core/models/response/fastMenuListResponse.model';
import { environment } from 'src/environment.ts/environment';
import { FastMenuListResponseDto } from '../dto/response/fastMenuListResponse.dto';
import { FastMenuMapper } from 'src/app/core/mappers/fastMenu.mapper';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { ProductsModel } from 'src/app/core/models/response/products.model';
import { ProductsDto } from '../dto/response/products.dto';

@Injectable({
  providedIn: 'root'
})
export class FastMenuService implements FastMenuRepository {

  http: HttpClient = inject(HttpClient);
  private baseUrl = '/award-catalogs-api/api/v1';

  getMenu(programId: number, menuTypeId: number): Observable<ResponseBaseModel<FastMenuListResponseModel>> {
    return this.http.get<ResponseBaseModel<FastMenuListResponseDto>>(`${environment.apiValepro}/program-api/api/v1/menu/get-menu?programId=${programId}&menuTypeId=${menuTypeId}`).pipe(
      map((response: ResponseBaseModel<FastMenuListResponseDto>) => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: FastMenuMapper.mapApiToDomainFastMenuListResponseDtoToModel(response.data)
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
          codeId: error.error.CodeId,
          message: error.error.Message,
          data: error.error.Data
        }
        return throwError(() => errorResponse);
      }));
  }; 
  
  getProducts(data: FilterProductsModel): Observable<ResponseBaseModel<ProductsModel>> {
      const dataSend = FastMenuMapper.fromDomainToApi(data);
      return this.http.post<ResponseBaseModel<ProductsDto>>(`${environment.apiValepro}${this.baseUrl}/Awards/get-awards-paginated-by-filter`, dataSend)
        .pipe(
          map(response => {
            return {
              codeId: response.codeId,
              message: response.message,
              data: FastMenuMapper.fromApiToDomain(response.data)
            }
          }),
          catchError((error: HttpErrorResponse) => {
            let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
              codeId: error.error.codeId,
              message: error.error.Message,
              data: error.error.Data
            }
            return throwError(() => errorResponse);
          }))
    }

}
