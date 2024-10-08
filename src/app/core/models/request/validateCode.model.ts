export class ValidateCodeRequestModel {

    constructor(
      public userName: string,
      public programId: number,
      public newPassword: string,
      public newPasswordVerified: string,
      public confirmationCode: string
      ) {
    }
}
export class ValidateCodeResponseModel {

    constructor(
      public sucess: boolean,
      ) {
    }
}