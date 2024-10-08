import { FastMenuItemDto } from "src/app/infrastructure/dto/response/fastMenuItem.dto";
import { FastMenuListResponseDto, GetQuickMenuDto } from "../../infrastructure/dto/response/fastMenuListResponse.dto";
import { FastMenuItemModel } from "../models/response/fastMenuItem.model";
import { FastMenuListResponseModel, GetQuickMenuModel } from "../models/response/fastMenuListResponse.model";
import { FilterProductsModel } from "../models/request/filterProducts.model";
import { FilterProductsDto } from "src/app/infrastructure/dto/request/filterProducts.dto";
import { ProductDto, ProductInfoDto, ProductsDto } from "src/app/infrastructure/dto/response/products.dto";
import { ProductInfo, ProductModel, ProductsModel } from "../models/response/products.model";

export class FastMenuMapper {
  static mapApiToDomainFastMenuListResponseDtoToModel(dto: FastMenuListResponseDto): FastMenuListResponseModel {
    const getQuickMenuModel = this.mapGetQuickMenuDtoToModel(dto.getQuickMenu);
    return new FastMenuListResponseModel(getQuickMenuModel);
  }

  static mapGetQuickMenuDtoToModel(dto: GetQuickMenuDto): GetQuickMenuModel {
    const menuItems = dto.menuItems.map(item => this.mapFastMenuItemDtoToModel(item));
    return new GetQuickMenuModel(
      dto.menuSettingsByProgramId,
      dto.programId,
      dto.menuTypeId,
      menuItems
    );
  }

  static mapFastMenuItemDtoToModel(dto: FastMenuItemDto): FastMenuItemModel {
    return new FastMenuItemModel(
      dto.menuItemId,
      dto.menuSettingsByProgramId,
      dto.name,
      dto.path,
      dto.order,
      dto.active
    );
  }

  static fromDomainToApi(filterData: FilterProductsModel): FilterProductsDto {
    return {
      mode: filterData.Mode,
      catalogueIds: filterData.CatalogueIds,
      productName: filterData.ProductName,
      categoryIds: filterData.CategoryIds,
      pointsOrderType: filterData.PointsOrderType,
      minimumPoints: filterData.MinimumPoints,
      maximumPoints: filterData.MaximumPoints,
      page: filterData.Page,
      pageSize: filterData.PageSize
    }
  }

  static fromApiToDomain(response: ProductsDto): ProductsModel {
    return {
      Products: this.mapProducts(response.awards)
    }
  }

  static mapProducts(products: ProductInfoDto): ProductInfo {
    return {
      Data: products.data.map((dto) => this.mapDataProduct(dto)),
      Pagination: null
    }
  }

  static mapDataProduct(dto: ProductDto): ProductModel {
    return {
      ProductId: dto.awardId,
      Name: dto.name,
      Points: dto.points,
      ImageName: dto.imageName,
      ImagePath: dto.imagePath
    }
  }

}
