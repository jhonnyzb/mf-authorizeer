export interface ProductsDto {
    awards: ProductInfoDto
}

export interface ProductInfoDto {
    data: ProductDto[]
    pagination: null
}

export interface ProductDto {
    awardId: number
    name: string
    points: number
    imageName: string
    imagePath: string
}
