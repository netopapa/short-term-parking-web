import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable()
export class SecurityService {

    usuarioAutenticado = false;

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('auth')) {
            this.usuarioAutenticado = true;
        }
    }

    welcome(token: string, user: User): void {
        this.usuarioAutenticado = true;
        localStorage.setItem('auth', token);
        localStorage.setItem('user',
            JSON.stringify({
                username: user.username,
                id: user.id
            })
        );
    }

    logOut(): void {
        localStorage.clear();
        this.usuarioAutenticado = false;
        this.router.navigate(['/pages/login']);
    }

    isAuthenticated(): boolean {
        return this.usuarioAutenticado;
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

}
