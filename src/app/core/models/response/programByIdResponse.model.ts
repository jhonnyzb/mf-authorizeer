export class ProgramsResponseModel {
    constructor(
        public programId: number,
        public name: string,
        public description: string,
        public groupPersonId: number,
        public programTypeId: number,
        public costCenter: number,
        public startDateValidity: string,
        public endDateValidity: string,
        public logo: string,
        public allowCoalition: number,
        public affiliationTypeId: number,
        public statusId: number,
        public extractMonths: number,
        public extractsPDFVirtualStore: boolean,
        public activateLogisticsManagement: boolean,
        public consolidateOC: boolean,
        public allowAmountInRedemption: number | null,
        public enviromentProgramId: number,
        public urlOrigin: string | null,
        public urlWebResponsive: string | null,
        public typeAccountingId: number,
        public limitScoreAffiliate: number | null,
        public companyPromoterMainId: number,
        public countryId: number,
        public regionId: string,
        public cityId: number,
        public address: string,
        public typeRounding: number,
        public decimalsPoints: number,
        public decimalsCurrency: number,
        public coinGLId: number,
        public percentagePaymentInPoints: number,
        public itsMultiCountry: boolean,
        public poolId: number | null,
        public clientApplicationId: number | null,
        public passwordMinLength: number,
        public canRegisterOnWebResponsive: boolean,
        public typeOfCoins: number,
        public settlemetaModel: number,
        public pointValue: number,
        public namePoint: string,
        public mixedPayment: boolean,
        public dateRegister: string,
        public dateUpdate: string,
        public personIdCreate: number,
        public personIdUpdate: number
    ){}
}