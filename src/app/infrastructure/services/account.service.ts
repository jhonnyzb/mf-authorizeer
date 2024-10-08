import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountRepository } from 'src/app/core/repositories/account.respository';
import { environment } from 'src/environment.ts/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService implements AccountRepository {


  constructor(
    private http: HttpClient,
  ) { }

  // getAccount(accountId: number): Observable<any> {
  //   return this.http.get(environment.serverName + "v1/cuentas?IDCuenta=" + accountId).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === HttpStatusCode.InternalServerError) {
  //         return throwError(() => 'Algo esta fallando en el servidor');
  //       }
  //       return throwError(() => error);
  //     })
  //   );
  // }

  // getTransactions(programId: number): Observable<any>{
  //   return this.http.get(environment.serverName  + 'v1/account/transactions?idAccount='+programId);
  // }
}
