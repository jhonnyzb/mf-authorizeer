export interface UpdateUserRequestDto {
  userId: string;
  programId: number;
  referenceTableId: number;
  isWebResponsive: boolean;
  attributes: AttributeDto[]

}

export interface AttributeDto {
  formAttributeId: number;
  value: string
}
