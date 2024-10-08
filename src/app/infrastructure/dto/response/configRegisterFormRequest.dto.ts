export interface ConfigRegisterFormRequestDto {
  programId: number
  attributes: AttributeConfigFormRequestDto[]
}

export interface AttributeConfigFormRequestDto {
  formAttributeId: number
  label: string
  placeholder: string
  name: string
  type: string
  errorMessageRegularExpression?: string
  regularExpression?: string
  length?: number
  dataSource?: number
  required: boolean
  position: number
}
