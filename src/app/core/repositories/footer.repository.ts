import { Observable } from 'rxjs';
import { ResponseBaseModel } from '../models/response/responseBase.model';

import { FooterResponseModel } from '../models/response/footerResponse.model';

export abstract class FooterRepository {
  abstract getFooter(programId: number): Observable<ResponseBaseModel<FooterResponseModel>>
}
