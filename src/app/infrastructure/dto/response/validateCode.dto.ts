export interface ValidateCodeDTO {
  userName: string;
  programId: number;
  newPassword: string;
  newPasswordVerified: string;
  confirmationCode: string;
}
export interface ValidateCodeResponseDTO {
  sucess: boolean;
}
