import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GenericFormComponent } from 'app/views/generic/generic-form/generic-form.component';
import { User } from 'app/model/user.model';
import { UserService } from 'app/service/user/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends GenericFormComponent<User, UserService> implements AfterViewInit {
  @ViewChild('userForm') userForm: NgForm;

  validPass: string;

  constructor(
    service: UserService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    super(router, activatedRoute, service, location, User);
  }

  ngAfterViewInit() {
    $('#userModal').on('hide.bs.modal', () => {
      this.userForm.resetForm();
    });
  }

  public initModal(user?: User): void {
    if (user) {
      Object.assign(this.obj, user);
      this.edit = true;
    } else {
      this.obj = new User();
      this.edit = false;
    }

    $('#userModal').modal('show');
  }

  closeModal(): void {
    $('#userModal').modal('hide');
  }

  passConfirmed(): boolean {
    if (!this.obj.password || !this.validPass) {
      return true;
    }

    return this.obj.password === this.validPass;
  }

}
