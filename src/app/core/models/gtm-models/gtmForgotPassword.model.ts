export class GTMForgotPassword {
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterType: string,
    public IDAccount: number,
    public UserName: string,
    public ParameterText: string,
    public IDProgram: number
  ) {}
}
