export interface LoginValeproResponseDto {
  userId: string
  userName: string
  accessToken: string
  name: string
  lastName: string
  fullName: string
  email: string
  phone: string
  hiddenEmail: string
  hiddenPhone: string
  personId: number
  sessionId: string
  programId: number
  accountId: number
  programName: string
  languageId: number
  requiredNewPassword: boolean
  authenticationLegacy: AuthenticationLegacyDto
  roles: RoleDto[]
  functionalities: FunctionalityDto[]
  acceptTermsAndConditions: boolean
  acceptHabeasData: boolean
}

export interface AuthenticationLegacyDto {
  idPersonaAutenticada: number
  sessionID: string
  idError: number
  mensajeError: string
  rolesPermiteAcceso: RolesPermiteAccesoDto[]
  cuentas: number[]
  idProgramas: number[]
  error: ErrorDto
  userName: string
  email: string
  token: string
  idCluster: number
  programas: ProgramaDto[]
}

export interface RolesPermiteAccesoDto {
  idRol: number
  nombre: string
}

export interface ErrorDto {
  idCodigo: number
  mensaje: string
}

export interface ProgramaDto {
  idPrograma: number
  nombrePrograma: string
}

export interface RoleDto {
  roleId: number
  roleName: string
}

export interface FunctionalityDto {
  id: number
  name: string
  pages: PageDto[]
}

export interface PageDto {
  pageId: number
  pageName: string
  permissions: string[]
}
