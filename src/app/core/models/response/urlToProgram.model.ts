export class UrlToProgramModel {
  constructor(
    public ProgramId: number,
    public LookAndFeel: LookAndFeelModel,
    public Name: string,
    public PasswordMinLength: number,
    public CanRegisterOnWebResponsive: boolean,
    public TagManagerWebGestor: string,
    public TagManagerWebResponsive: string,
    public Copyright: string
  ) {}
}

export class LookAndFeelModel {
  constructor(
    public LookAndFeelId: number,
    public ImageBackgroundLogin: string,
    public BigImageBackgroundLogin: string,
    public UseBigBackground: boolean,
    public PrimaryColor: string,
    public SecondaryColor: string,
    public TertiaryColor: string,
    public backgroundColor: string,
    public FontFamilyName: string,
    public Icon: string
  ) {}
}
