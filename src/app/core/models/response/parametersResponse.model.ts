export class ParametersResponseModel {
    constructor(
        public ParametersList: ParameterModel[]
    ) { }
}

export class ParameterModel {
    constructor(
        public ParameterId: number,
        public ProgramId: number,
        public ConceptId: number,
        public ParameterName: string,
        public ParameterValue: string,
    ) { }
}