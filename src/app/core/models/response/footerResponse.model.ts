export class FooterResponseModel {
  constructor(
    public FooterPrograms: FooterProgramsModel
  ) { }
}

export class FooterProgramsModel {
  constructor(
    public FooterId: number,
    public ProgramId: number,
    public TermsAndConditions: string,
    public TermsName: string,
    public DataProcessingPolicy: string,
    public DataPName: string,
    public Faq: string,
    public FaqName: string,
    public Email: string,
    public Phone: string,
    public Copyright: string
  ) { }
}
