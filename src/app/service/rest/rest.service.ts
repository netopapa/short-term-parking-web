import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ERROR_CODE } from 'app/constant/error-codes';
import { ErrorService } from 'app/service/toast-notification-service/error-service/error.service';
import { Util } from 'app/util/util';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class RestService {
  headers: Headers;

  constructor(
    public http: Http,
    private translate: TranslationService,
    public errorHandler?: ErrorService,
  ) {
  }

  getRequestOptions() {
    const options = new RequestOptions({ headers: this.headers });

    if (!options.headers) {
      options.headers = new Headers();
    }

    if (!options.headers.has('Content-Type')) {
      options.headers.set('Content-Type', 'application/json');
    }

    if (!options.headers.has('Accept')) {
      options.headers.set('Accept', 'application/json');
    }

    return options;
  }

  get(url: string, params?: any[]): Observable<any> {
    if (params === undefined) {
      return this.http
        .get(url, this.optionsHeader())
        .map(this.extractData)
        .catch(this.handleError.bind(this));
    } else {
      const param = new URLSearchParams();

      params.forEach(element => {
        param.set(element.paramName, element.param);
      });

      return this.http
        .get(url, this.optionsHeader(param))
        .map(this.extractData)
        .catch(this.handleError.bind(this));
    }
  }

  post(url: string, payload?: any): Observable<any> {
    const body = payload ? JSON.stringify(payload) : null;
    return this.http
      .post(url, body, this.optionsHeader())
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  postFile(url: string, param: any): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, param, options)
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  put(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .put(url, body, this.getRequestOptions())
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  patch(url: string, param?: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .patch(url, body, this.getRequestOptions())
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  // HTTP DELETE usando Observable com objeto complexo como parâmetro
  // O campo de pesquisa desse objeto pode ser usado para definir uma string ou um objeto URLSearchParams
  delete(url: string, param: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = this.getRequestOptions();
    options.search = params;

    return this.http
      .delete(url, this.getRequestOptions())
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  // HTTP DELETE usando Observable com ID como parâmetro
  remove(url: string, val: string): Observable<any> {
    return this.http
      .delete(url + val, this.getRequestOptions())
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  public extractData(res: Response) {
    try {
      const body = res.json();
      return body;
    } catch (error) {
      return res;
    }
  }

  private checkJson(resp: Response | any): boolean {
    try {
      resp.json();
      return true;
    } catch (err) {
      return false;
    }
  }

  getErrorJwt(msg: any): boolean {
    const objString = msg.split('/');
    const obj = JSON.parse(objString);
    let mesg: String = obj.message;
    mesg = mesg.substring(0, 11);
    if (mesg === 'JWT expired') {
      return true;
    }
    return false;
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    const errorCustoms = JSON.parse(error._body);

    this.errorHandler.showErrorConvert(errorCustoms);

    if (error.status === 401) {
      error._body = this.translate.translate('Não autorizado');
      // this.security.logOut();
    }

    if (error instanceof Response && this.checkJson(error)) {
      const body = error.json() || '';
      if (body instanceof Array && body.length > 0) {
        errMsg = body[0];
      } else {
        errMsg = body._body;
      }
    } else if (error._body) {
      errMsg = this.setLoginFeedBack(error._body);
    } else {
      errMsg = error._body;
    }

    if (errMsg === undefined) {
      errMsg = this.translate.translate('Erro com a conexão');
    }

    // if (this.errorHandler) {
    //   const errorCustom = JSON.parse(error._body);
    //   const teste = this.translate.translate(ERROR_CODE.get(errorCustom.code));
    //   this.errorHandler.throwError(new Error(this.translate.translate(ERROR_CODE.get(errorCustom.code))));
    // }
    return Observable.throw(errMsg);
  }

  public optionsHeader(params?: URLSearchParams): RequestOptions {
    const options = this.getRequestOptions();
    if (params !== null) {
      options.params = params;
    }

    return this.getRequestOptions();
  }

  insertParam(baseUrl, key, value) {
    return Util.insertRequestParam(baseUrl, key, value);
  }

  setLoginFeedBack(msg: string) {
    switch (msg) {
      case 'user.password.mismatch':
        return this.translate.translate('Nome de Usuário ou senha inválidos.');
      case 'user.disabled':
        return this.translate.translate('Este usuário está desativado.');
      case 'username.not.found':
        return this.translate.translate('Usuário não encontrado.');
      default:
        return this.translate.translate(msg);
    }
  }
}
