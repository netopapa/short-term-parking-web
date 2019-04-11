import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/model/user.model';
import { TranslationService } from 'app/service/translation/translation.service';
import { UserService } from 'app/service/user/user.service';
import { GenericListComponent } from 'app/views/generic/generic-list/generic-list.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends GenericListComponent<User, UserService> {

  @ViewChild('userModal') userModal: UserFormComponent;

  constructor(
    translate: TranslationService,
    service: UserService,
    router: Router,
    activedRouter: ActivatedRoute,
    location: Location
  ) {
    super(translate, service, router, activedRouter, location);
  }

  showModal(user?: User): void {
    this.userModal.initModal(user);
  }

}
