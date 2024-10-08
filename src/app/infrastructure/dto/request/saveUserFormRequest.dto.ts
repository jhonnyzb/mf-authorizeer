export interface SaveUserRequestDto {
  programId: number;
  referenceTableId: number;
  attributes: AttributeDto[]

}

export interface AttributeDto {
  formAttributeId: number
  value: string
}
