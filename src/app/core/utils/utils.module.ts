import { UserUtils } from './UserUtils';
import { ConfigUtil } from './ConfigUtil';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarUtil } from './TopbarUtil';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[
    ConfigUtil,
    UserUtils,
    TopbarUtil,
  ]
})
export class UtilsModule { }
