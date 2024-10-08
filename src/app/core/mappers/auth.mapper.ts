import { ValidateCodeDTO, ValidateCodeResponseDTO } from 'src/app/infrastructure/dto/response/validateCode.dto';
import { LoginValeproRequestDto } from '../../infrastructure/dto/request/loginValeproRequest.dto';
import { ConfigRegisterFormRequestDto } from '../../infrastructure/dto/response/configRegisterFormRequest.dto';
import { GenerateCodeResponseDto } from '../../infrastructure/dto/response/generateCodeResponse.dto';
import { LoginValeproResponseDto, RoleDto } from '../../infrastructure/dto/response/loginValeproResponse.dto';
import { GenerateCodeResponseModel, GenerateCodeRequestModel } from '../models/request/generateCodeRequest.model';
import { ValidateCodeResponseModel, ValidateCodeRequestModel } from '../models/request/validateCode.model';
import { AttributeConfigFormRequestModel, ConfigRegisterFormRequestModel } from '../models/response/configRegisterFormRequest.model';
import { LoginValeproResponseModel, RoleModel } from '../models/response/loginValeproResponse.model';
import { LoginValeproRequestModel } from './../models/request/loginValeproRequest.model';
import { GenerateCodeDTO } from 'src/app/infrastructure/dto/request/generateCodeRequest.dto';
import { ParameterDto, ParametersResponseDto } from 'src/app/infrastructure/dto/response/parametersResponse.dto';
import { ParameterModel, ParametersResponseModel } from '../models/response/parametersResponse.model';
import { ProgramsResponseDto } from 'src/app/infrastructure/dto/response/programByIdResponse.dto';
import { ProgramsResponseModel } from '../models/response/programByIdResponse.model';


export class AuthMapper {
  static mapLoginApiToDomain(data: LoginValeproResponseDto): LoginValeproResponseModel {
    return new LoginValeproResponseModel(
      data.userId,
      data.userName,
      data.accessToken,
      data.name,
      data.lastName,
      data.fullName,
      data.email,
      data.phone,
      data.hiddenEmail,
      data.hiddenPhone,
      data.personId,
      data.sessionId,
      data.programId,
      data.accountId,
      data.programName,
      data.languageId,
      data.requiredNewPassword,
      this.mapLoginRoleApiToDomain(data.roles),
      data.acceptHabeasData,
      data.acceptTermsAndConditions
    );
  }



  static mapLoginRoleApiToDomain(roleDto: RoleDto[]): RoleModel[] {
    if (roleDto == null) {
      return null;
    }
    return roleDto.map(role =>
      new RoleModel(
        role.roleId,
        role.roleName)
    );
  }

  static loginDomainToApi(model: LoginValeproRequestModel): LoginValeproRequestDto {
    return {
      password: model.Pass,
      programId: model.ProgramId,
      username: model.User
    }
  }
  static generateCodeFromApiToDomain(generateCodeDto: GenerateCodeResponseDto): GenerateCodeResponseModel {
    return {
      UserName: generateCodeDto.userName,
      Phone: generateCodeDto.phone,
      Email: generateCodeDto.email
    };
  }
  static generateCodeFromDomainToApi(generateCodeModel: GenerateCodeRequestModel): GenerateCodeDTO {
    return {
      userName: generateCodeModel.UserName,
      programId: generateCodeModel.ProgramId
    };
  }
  static validateCodeFromApiToDomain(validateCodeDto: ValidateCodeResponseDTO): ValidateCodeResponseModel {
    return {
      sucess: validateCodeDto.sucess
    };
  }
  static validateCodeFromDomainToApi(validateCodeModel: ValidateCodeRequestModel): ValidateCodeDTO {
    return {
      userName: validateCodeModel.userName,
      programId: validateCodeModel.programId,
      newPassword: validateCodeModel.newPassword,
      newPasswordVerified: validateCodeModel.newPasswordVerified,
      confirmationCode: validateCodeModel.confirmationCode
    };
  }


  static domainToApiRegister(registerModel: any): any {
    return registerModel;
  }


  static configFormApiToDomain(configForm: ConfigRegisterFormRequestDto): ConfigRegisterFormRequestModel {
    const attributeModels: AttributeConfigFormRequestModel[] = configForm.attributes.map(attributeDto => {
      return new AttributeConfigFormRequestModel(
        attributeDto.formAttributeId,
        attributeDto.label,
        attributeDto.placeholder,
        attributeDto.name,
        attributeDto.type,
        attributeDto.required,
        attributeDto.position,
        attributeDto.errorMessageRegularExpression,
        attributeDto.regularExpression,
        attributeDto.length,
        attributeDto.dataSource
      );
    });

    return new ConfigRegisterFormRequestModel(
      configForm.programId,
      attributeModels
    );
  }

  static parametersFromApiToDomain(dto: ParametersResponseDto): ParametersResponseModel {
    return {
      ParametersList: AuthMapper.mapParameter(dto.parametersList)
    }
  }
  static mapParameter(parameters: ParameterDto[]): ParameterModel[] {
    return parameters.map((parameter) => ({
      ParameterId: parameter.parameterId,
      ProgramId: parameter.programId,
      ConceptId: parameter.conceptId,
      ParameterName: parameter.parameterName,
      ParameterValue: parameter.parameterValue
    }));
  }

  static programsByIdFromApiToDomain(dto: ProgramsResponseDto): ProgramsResponseModel {
    return {
      programId: dto.programId,
      name: dto.name,
      description: dto.description,
      groupPersonId: dto.groupPersonId,
      programTypeId: dto.programTypeId,
      costCenter: dto.costCenter,
      startDateValidity: dto.startDateValidity,
      endDateValidity: dto.endDateValidity,
      logo: dto.logo,
      allowCoalition: dto.allowCoalition,
      affiliationTypeId: dto.affiliationTypeId,
      statusId: dto.statusId,
      extractMonths: dto.extractMonths,
      extractsPDFVirtualStore: dto.extractsPDFVirtualStore,
      activateLogisticsManagement: dto.activateLogisticsManagement,
      consolidateOC: dto.consolidateOC,
      allowAmountInRedemption: dto.allowAmountInRedemption,
      enviromentProgramId: dto.enviromentProgramId,
      urlOrigin: dto.urlOrigin,
      urlWebResponsive: dto.urlWebResponsive,
      typeAccountingId: dto.typeAccountingId,
      limitScoreAffiliate: dto.limitScoreAffiliate,
      companyPromoterMainId: dto.companyPromoterMainId,
      countryId: dto.countryId,
      regionId: dto.regionId,
      cityId: dto.cityId,
      address: dto.address,
      typeRounding: dto.typeRounding,
      decimalsPoints: dto.decimalsPoints,
      decimalsCurrency: dto.decimalsCurrency,
      coinGLId: dto.coinGLId,
      percentagePaymentInPoints: dto.percentagePaymentInPoints,
      itsMultiCountry: dto.itsMultiCountry,
      poolId: dto.poolId,
      clientApplicationId: dto.clientApplicationId,
      passwordMinLength: dto.passwordMinLength,
      canRegisterOnWebResponsive: dto.canRegisterOnWebResponsive,
      typeOfCoins: dto.typeOfCoins,
      settlemetaModel: dto.settlemetaModel,
      pointValue: dto.pointValue,
      namePoint: dto.namePoint,
      mixedPayment: dto.mixedPayment,
      dateRegister: dto.dateRegister,
      dateUpdate: dto.dateUpdate,
      personIdCreate: dto.personIdCreate,
      personIdUpdate: dto.personIdUpdate
    }
  }
}
