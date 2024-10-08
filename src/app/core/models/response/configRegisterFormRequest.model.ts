import { GenericListResponseModel } from "./genericResponse.model";

export class ConfigRegisterFormRequestModel {
  constructor(
    public ProgramId: number,
    public Attributes: AttributeConfigFormRequestModel[]
  ) {}
}

export class AttributeConfigFormRequestModel {
  constructor(
    public FormAttributeId: number,
    public Label: string,
    public Placeholder: string,
    public Name: string,
    public Type: string,
    public Required: boolean,
    public Position: number,
    public ErrorMessageRegularExpression: string,
    public RegularExpression?: string,
    public Length?: number,
    public DataSource?: number,
    public listAsigned?: GenericListResponseModel[]
  ) {}
}
