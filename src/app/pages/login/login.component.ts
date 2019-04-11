import { Component } from '@angular/core';
import { LoginService } from 'app/service/login/login.service';
import { SecurityService } from 'app/guards/security.service';
import { Router } from '@angular/router';
import { LoginDTO } from 'app/model/login.dto';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    loginObj: LoginDTO = new LoginDTO();

    constructor(
        private service: LoginService,
        private security: SecurityService,
        private router: Router,
    ) { }

    login(): void {
        this.service.login(this.loginObj).subscribe(
            success => {
                const jwt: string = success.headers.get('authorization');
                this.security.welcome(jwt, success.json());
                this.router.navigate(['/']);
            }
        );
    }
}
