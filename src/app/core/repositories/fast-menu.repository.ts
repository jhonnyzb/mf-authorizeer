import { Observable } from "rxjs";
import { ResponseBaseModel } from "../models/response/responseBase.model";
import { FastMenuListResponseModel } from "../models/response/fastMenuListResponse.model";
import { FilterProductsModel } from "../models/request/filterProducts.model";
import { ProductsModel } from "../models/response/products.model";
export abstract class FastMenuRepository {
  abstract getMenu(programId: number, menuTypeId: number): Observable<ResponseBaseModel<FastMenuListResponseModel>>;
  abstract getProducts(data: FilterProductsModel): Observable<ResponseBaseModel<ProductsModel>>;
}
