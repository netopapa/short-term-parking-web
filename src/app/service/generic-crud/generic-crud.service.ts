import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { ErrorService } from 'app/service/toast-notification-service/error-service/error.service';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../rest/rest.service';


@Injectable()
export class CrudService<T extends any> extends RestService {

  baseURL = Constant.BASE_URL;

  constructor(
    http: Http,
    baseUrl: string,
    errorHandler: ErrorService,
    public activatedRoute: ActivatedRoute
  ) {
    super(http, errorHandler);
    this.baseURL += baseUrl;
  }

  public getAll(): Observable<Array<T>> {
    return this.get(this.baseURL);
  }

  public getActives(route?: string): Observable<Array<T>> {
    if (route !== undefined) {
      return this.get(this.baseURL + 'findActives');
    } else {
      return this.get(this.baseURL + 'findActives');
    }
  }

  public getOne(id: String): Observable<T> {
    const getAllUrl = this.baseURL + id;
    return this.get(getAllUrl);
  }

  public save(data: T): Observable<any> {
    let saveUrl = '';
    saveUrl = this.baseURL;

    return this.post(saveUrl, data);
  }

  public saveAll(data: T[], pathParam?: string): Observable<any> {
    const saveUrl = this.baseURL + 'collection' + (pathParam ? '/' + pathParam : '');
    return this.post(saveUrl, data);
  }

  public update(data: T): Observable<any> {
    const updateUrl = this.baseURL;
    return this.put(updateUrl, data);
  }

  public updateAll(data: T[]): Observable<any> {
    const updateUrl = this.baseURL;
    return this.put(updateUrl, data);
  }

  public delete(id: string): Observable<any> {
    const deleteURL = this.baseURL;
    return this.remove(deleteURL, id);
  }

  public enable(id: string): Observable<any> {
    const enableURL = this.baseURL + 'enable/' + id;

    return this.post(enableURL);
  }

  public disable(id: string): Observable<any> {
    const disableURL = this.baseURL + 'disable/' + id;
    return this.post(disableURL);
  }

}
