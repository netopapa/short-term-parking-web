import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constant, WS_URL } from 'app/constant/constant';
import * as shajs from 'sha.js';
import { RestService } from '../rest/rest.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { TranslationService } from '../translation/translation.service';
import { LoginDTO } from 'app/model/login.dto';
import { SecurityService } from 'app/guards/security.service';

@Injectable()
export class LoginService extends RestService {

  baseURL = WS_URL;

  constructor(
    public http: Http,
    translate: TranslationService,
    security: SecurityService,
    public errorHandler?: ErrorService
  ) {
    super(http, translate, errorHandler);
  }

  public login(userLogin: LoginDTO): Observable<any> {
    const senha = shajs('sha256').update(userLogin.password).digest('hex');
    const req: LoginDTO = { username: userLogin.username, password: senha };

    const body = JSON.stringify(req);
    return this.http
      .post(this.baseURL + Constant.LOGIN, body, this.optionsHeader())
      .catch(this.handleError.bind(this));
  }

  // public recover(email: string): Observable<any> {
  //   const recoverUrl = this.baseURL + Constant.RECOVER + email;
  //   return this.post(recoverUrl);
  // }

  // public reset(password: string): Observable<any> {
  //   const req: ResetDTO = {
  //     password: shajs('sha256').update(password).digest('hex'),
  //     token: '' //DO IT
  //   };
  //   return this.post(this.baseURL + Constant.RESET, req);
  // }

  // public changePassword(changePass: ChangePassword): Observable<any> {
  //   return this.post(this.baseURL + Constant.CHANGE, changePass);
  // }

  // public changeUserPassword(changeUserPass: ChangeUserPassword): Observable<any> {
  //   return this.post(this.baseURL + Constant.USER_CHANGE, changeUserPass);
  // }
}
