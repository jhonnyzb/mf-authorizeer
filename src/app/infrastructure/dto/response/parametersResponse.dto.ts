export interface ParametersResponseDto {
    parametersList: ParameterDto[]
}

export interface ParameterDto {
    parameterId: number
    programId: number
    conceptId: number
    parameterName: string
    parameterValue: string
}