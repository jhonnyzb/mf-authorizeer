import { FooterProgramsDto, FooterResponseDto } from "../../infrastructure/dto/response/footerResponse.dto";
import { FooterProgramsModel, FooterResponseModel } from "../models/response/footerResponse.model";

export class FooterMapper {

  static mapResponseFooterDataApiToDomain(dto: FooterResponseDto): FooterResponseModel {
    return new FooterResponseModel(
      this.mapProgramsDtoToModel(dto.footerPrograms)
    );
  }

  static mapProgramsDtoToModel(dto: FooterProgramsDto): FooterProgramsModel {
    return new FooterProgramsModel(
      dto.footerId,
      dto.programId,
      dto.termsAndConditions,
      dto.termsName,
      dto.dataProcessingPolicy,
      dto.dataPName,
      dto.faq,
      dto.faqName,
      dto.email,
      dto.phone,
      dto.copyright
    );
  }

}
