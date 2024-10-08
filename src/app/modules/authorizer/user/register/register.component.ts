import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';
import { Parameters } from 'src/app/core/enum/enums';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { DialogParams } from 'src/app/core/models/dialogParams.model';
import { UserRepository } from 'src/app/core/repositories/user.respository';
import { TablesRepository } from 'src/app/core/repositories/tables.repository';
import { AttributeModel, SaveUserRequestModel } from 'src/app/core/models/request/saveUserFormRequest.model';
import { GenericListResponseModel } from 'src/app/core/models/response/genericResponse.model';
import { OnlyAssetsToBuildLoyalty } from 'src/app/core/enum/onlyAssetsToBuildLoyaltyEnum';
import { StatusEnum } from 'src/app/core/enum/statusEnum';
import { LanguageEnum } from 'src/app/core/enum/languageEnum';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { getSession, saveSession } from 'src/app/core/models/encryptData';
import { AttributeConfigFormRequestModel, ConfigRegisterFormRequestModel } from 'src/app/core/models/response/configRegisterFormRequest.model';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {


  anio: number = new Date().getFullYear();
  isLoading = false;
  segment!: GenericListResponseModel;
  programId: number = getSession<number>('programId');


  constructor(private tableRepository: TablesRepository,
    private formBuilder: FormBuilder,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) { }

  //#region Form
  formRegister!: FormGroup;
  configForm: ConfigRegisterFormRequestModel;
  //#endregion

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({

    });
    this.loadForm();
  }



  loadForm() {
    this.isLoading = true;
    this.authRepository.getConfigFormRegister(this.programId, 1).subscribe({
      next: (response: ResponseBaseModel<ConfigRegisterFormRequestModel>) => {
        this.configForm = response.data;
        this.createConfigForm();
        this.isLoading = false;
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
        this.isLoading = false;
      }
    });
  }


  createConfigForm() {
    this.formRegister = this.formBuilder.group({});

    this.configForm.Attributes.forEach((field: AttributeConfigFormRequestModel) => {
      let control = new FormControl(field.Type == 'R' ? false : field.Type == 'L' ? null : field.Type == 'D' ? null : field.Type == 'M' ? [0] : null);
      this.formRegister.addControl(field.FormAttributeId.toString(), control);

      let validators = [];
      if (field.Required && !([29, 28, 27, 26, 25, 24, 23, 18, 17, 21].includes(field.FormAttributeId))) {
        validators.push(Validators.required);
      }
      if (field.Length > 0) {
        validators.push(Validators.maxLength(field.Length));
      }
      if (field.RegularExpression) {
        validators.push(Validators.pattern(field.RegularExpression));
      }
      this.formRegister.get(field.FormAttributeId.toString()).setValidators(validators);

      if (field.Type == 'L' || field.Type == 'M') {
        this.getListGeneral(field.DataSource, field.Name);
      }

      if (field.FormAttributeId == 17) {
        this.formRegister.get(field.FormAttributeId.toString()).setValue(new Date());
      }
    });
  }



  getListGeneral(id: number, name: string) {
    if (name == 'StateProvinceResidenceId' || name == 'CityResidenceId') {
      return;
    }
    if (name == 'RoleId') {
      return;
    }

    if (name == 'CountryResidenceId') {
      this.getCountries(name);
      return;
    }

    if (name == 'ClusterId') {
      this.getClusters(name);
      return;
    }

    if (name == 'AgencyId') {
      return;
    }

    this.getReferentialList(id, name);
  }

  getReferentialList(id: number, name: string) {
    this.tableRepository.getReferentialData(id, LanguageEnum.Spanish).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  getClusters(name: string) {
    this.tableRepository.getClusters(this.programId).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
        this.segment = data.data[0];
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    })
  }

  getCountries(name: string) {
    this.tableRepository.getCountries(LanguageEnum.Spanish, StatusEnum.isCurrent, OnlyAssetsToBuildLoyalty.own).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  getDepartments(name: string, value: number) {
    this.tableRepository.getDepartments(LanguageEnum.Spanish, value.toString()).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  getCities(name: string, countryCode: string, departmentCode: string,) {
    this.tableRepository.getCities(LanguageEnum.Spanish, countryCode, departmentCode).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  setListToItem(list: GenericListResponseModel[], name: string) {

    this.configForm.Attributes.forEach(item => {
      if (item.Name == name) {
        item.listAsigned = list;
      }
    });
  }

  changeListLocation(name: string, value: number) {
    if (name == 'CountryResidenceId') {
      let val = this.formRegister.get(value.toString())?.value;
      saveSession(val, 'countryFromCreateId');
      this.getDepartments('StateProvinceResidenceId', val);
      return;
    }

    if (name == 'StateProvinceResidenceId') {
      let country: string = getSession('countryFromCreateId');
      let department = this.formRegister.get(value.toString())?.value;
      this.getCities('CityResidenceId', country, department);
    }

  }

  save() {
    let born = new Date();
    this.formRegister.markAllAsTouched();
    if (this.formRegister.invalid) {
      return;
    }
    if (this.formRegister.invalid) {
      let params: DialogParams = {
        success: false,
        msg: undefined,
        page: undefined,
        confirmText: ""
      };
      this.dialogService.openConfirmDialog("Por favor, valida los campos.", params);
      this.isLoading = false;
      return
    };
    this.configForm.Attributes.forEach(item => {
      if (item.FormAttributeId == 14) {
        const control = this.formRegister.get(item.FormAttributeId.toString());
        if (control) {
          born = control.value;
          control.setValue(this.datePipe.transform(born, 'dd/MM/yyyy'));
        }
      }

      if (item.FormAttributeId == 21) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue('0')
      }

      if (item.FormAttributeId == 25) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue('0')
      }

      if (item.FormAttributeId == 23) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue('')
      }

      if (item.FormAttributeId == 24) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue(this.segment.codeId.toString())
      }
      else {
        this.formRegister.addControl('24', new FormControl('1'))
      }
      if (item.FormAttributeId == 26) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue('false')
      }
      if (item.FormAttributeId == 27) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue(this.formRegister.get('2')?.value)
      }
      if (item.FormAttributeId == 28) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue(Parameters.rol.toString())
      }
      if (item.FormAttributeId == 29) {
        this.formRegister.get(item.FormAttributeId.toString()).setValue('true')
      }
      if (item.FormAttributeId == 18) {
        this.formRegister.get('18').setValue(this.configForm.Attributes.filter(x => x.FormAttributeId == 18)[0].listAsigned[0].codeId.toString())
      }
      else {
        this.formRegister.addControl('18', new FormControl('1'))
      }
      if (item.FormAttributeId == 17) {
        this.formRegister.get('17').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy'))
      }
      else {
        this.formRegister.addControl('17', new FormControl(this.datePipe.transform(new Date(), 'dd/MM/yyyy')))
      }

      if (this.formRegister.get('14').value == null) {
        this.formRegister.get('14').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy'))
      }

    });
    this.isLoading = true;

    const attributes: AttributeModel[] = Object.keys(this.formRegister.controls).map(key => {
      return new AttributeModel(Number(key), `${this.formRegister.get(key)?.value}`);
    });

    const modelRequest: SaveUserRequestModel = {
      programId: getSession<number>('programId'),
      referenceTableId: Parameters.referenceTableId,
      attributes: attributes
    };

    this.userRepository.saveUserForm(modelRequest).subscribe({
      next: (response: ResponseBaseModel<any>) => {
        this.isLoading = false;
        this.formRegister.reset();
        const dialogParams: DialogParams = {
          msg: undefined,
          page: undefined,
          success: true,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog(response.message, dialogParams);
        this.createConfigForm();
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoading = false;
        this.formRegister.get('14').setValue(born);
        const dialogParams: DialogParams = {
          msg: undefined,
          page: undefined,
          success: false,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog(error.message, dialogParams);
      }
    });
  }


  sendRegisterButtonGtmEvent(){
    let event: GTMSelectContent = {
      event: 'Select_content',
      ParameterTarget: 'Home',
      ParameterType: 'button',
      ParameterCategory: 'Login Vale Pro',
      IDAccount: 0,
      UserName: '',
      IDProgram: getSession<number>('programId'),
      IDPerson: 0,
      ParameterText: 'Iniciar sesión',
      ParameterItemID: '',
    }
    this.gtmEventRepository.sendEvent(event);
  }
}
