import { FastMenuItemDto } from "./fastMenuItem.dto"

export interface FastMenuListResponseDto {
  getQuickMenu: GetQuickMenuDto
}

export interface GetQuickMenuDto {
  menuSettingsByProgramId: number
  programId: number
  menuTypeId: number
  menuItems: FastMenuItemDto[]
}
