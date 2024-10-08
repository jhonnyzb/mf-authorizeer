export interface FilterProductsDto {
    mode: number;
    catalogueIds: number[];
    productName: string | null;
    categoryIds: number[];
    pointsOrderType: number | null;
    minimumPoints: number | null;
    maximumPoints: number | null;
    page: number;
    pageSize: number;
}
