import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizerRoutingModule } from './authorizer-routing.module';
import { UserModule } from './user/user.module';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';
import { FastMenuRepository } from 'src/app/core/repositories/fast-menu.repository';
import { FooterRepository } from 'src/app/core/repositories/footer.repository';
import { TablesRepository } from 'src/app/core/repositories/tables.repository';
import { TablesService } from 'src/app/infrastructure/services/tables.service';
import { AccountRepository } from 'src/app/core/repositories/account.respository';
import { AccountService } from 'src/app/infrastructure/services/account.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { FooterService } from 'src/app/infrastructure/services/footer.service';
import { FastMenuService } from 'src/app/infrastructure/services/fast-menu.service';
import { UserRepository } from 'src/app/core/repositories/user.respository';
import { UserService } from 'src/app/infrastructure/services/user.service';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { GtmDispatchEventsService } from 'src/app/infrastructure/services/gtm-dispatch-events.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthorizerRoutingModule,
    UserModule
  ],
  providers: [
    {provide: AccountRepository, useClass: AccountService},
    {provide: AuthRepository, useClass: AuthService},
    {provide: FooterRepository, useClass: FooterService},
    {provide: FastMenuRepository, useClass: FastMenuService},
    {provide: TablesRepository, useClass: TablesService},
    {provide: UserRepository, useClass: UserService},
    {provide: GtmDispatchEventsRepository, useClass: GtmDispatchEventsService},
  ]
})
export class AuthorizerModule { }
