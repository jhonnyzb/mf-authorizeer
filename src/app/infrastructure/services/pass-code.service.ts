import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidateCodeRequestDto } from '../dto/response/validateCodeRequest.dto';
import { EnvironmentModel } from 'src/app/core/models/response/environment.model';
import { getSession } from 'src/app/core/models/encryptData';
import { environment } from 'src/environment.ts/environment';

@Injectable({
  providedIn: 'root'
})
export class PassCodeService {

  private httpOptions: any;

  constructor(
    private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  generateCode(data: any): Observable<any> {
    return this.http.post(environment.serverName + 'v1/authorize/generate', data, this.httpOptions);
  }

  validateCode(data: any) {
    return this.http.post<ValidateCodeRequestDto>(environment.serverName + 'v1/authorize/validate', data);
  }

}
