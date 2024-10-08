export class FilterProductsModel {
    constructor(
      public Mode: number,
      public CatalogueIds: number[],
      public ProductName: string | null,
      public CategoryIds: number[],
      public PointsOrderType : number | null,
      public MinimumPoints : number | null,
      public MaximumPoints : number | null,
      public Page: number,
      public PageSize: number,
      ) { }
  }
