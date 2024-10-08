export interface ProgramsResponseDto {
    programId: number
    name: string
    description: string
    groupPersonId: number
    programTypeId: number
    costCenter: number
    startDateValidity: string
    endDateValidity: string
    logo: string
    allowCoalition: number
    affiliationTypeId: number
    statusId: number
    extractMonths: number
    extractsPDFVirtualStore: boolean
    activateLogisticsManagement: boolean
    consolidateOC: boolean
    allowAmountInRedemption: number | null
    enviromentProgramId: number
    urlOrigin: string | null
    urlWebResponsive: string | null
    typeAccountingId: number
    limitScoreAffiliate: number | null
    companyPromoterMainId: number
    countryId: number
    regionId: string
    cityId: number
    address: string
    typeRounding: number
    decimalsPoints: number
    decimalsCurrency: number
    coinGLId: number
    percentagePaymentInPoints: number
    itsMultiCountry: boolean
    poolId: number | null
    clientApplicationId: number | null
    passwordMinLength: number
    canRegisterOnWebResponsive: boolean
    typeOfCoins: number
    settlemetaModel: number
    pointValue: number
    namePoint: string
    mixedPayment: boolean
    dateRegister: string
    dateUpdate: string
    personIdCreate: number
    personIdUpdate: number
}