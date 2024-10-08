export class ProductsModel {
    constructor(
        public Products: ProductInfo
    ){}
}
export class ProductInfo {
    constructor(
        public Data: ProductModel[],
        public Pagination:  null,
    ){}
}
export class ProductModel {
    constructor(
      public ProductId: number,
      public Name: string,
      public Points: number,
      public ImageName: string,
      public ImagePath: string,
      ) { }
}
