export interface FooterResponseDto {
  footerPrograms: FooterProgramsDto
}

export interface FooterProgramsDto {
  footerId: number
  programId: number
  termsAndConditions: string
  termsName: string
  dataProcessingPolicy: string
  dataPName: string
  faq: string
  faqName: string
  email: string
  phone: string
  copyright: string
}
