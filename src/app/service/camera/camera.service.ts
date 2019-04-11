import { Injectable } from '@angular/core';
import { CrudService } from '../generic-crud/generic-crud.service';
import { Camera } from 'app/model/camera.model';
import { Http } from '@angular/http';
import { TranslationService } from '../translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { Constant } from 'app/constant/constant';

@Injectable()
export class CameraService extends CrudService<Camera> {

  constructor(http: Http,
    translate: TranslationService,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.CAMERA, errorHandler, translate, activatedRoute);
  }

}
