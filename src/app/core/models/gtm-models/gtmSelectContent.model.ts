export class GTMSelectContent {
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterType: string,
    public ParameterCategory: string,
    public IDAccount: number,
    public UserName: string,
    public IDProgram: number,
    public IDPerson: number,
    public ParameterText: string,
    public ParameterItemID: string,
  ) {}
}

export class GTMValueOfGTMSelectContent {
  constructor(
    public Puntos: number,
    public Dinero: number
  ) {}
}
