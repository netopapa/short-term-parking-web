import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import * as shajs from 'sha.js';
import { ToastService } from 'app/service/toast-notification-service/toast-service/toast.service';
import { MessageType } from 'app/service/toast-notification-service/message-type.enum';
import { TranslationService } from 'app/service/translation/translation.service';
import { Languages } from '../translation/translations';
import { Subscription } from 'rxjs/Subscription';


const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit, AfterViewInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    opened: Boolean = false;
    userId: String = '';
    oldPass: String = '';
    newPass: String = '';
    confirmPass: String = '';
    private _router: Subscription;

    @ViewChild('app-navbar-cmp') button: any;

    languages = Languages;
    set selectedLanguage(value) {
        localStorage.setItem('lang', value);
        this._translate.use(this.selectedLanguage);
    }

    get selectedLanguage() {
        if (!localStorage.getItem('lang') || localStorage.getItem('lang') === '') {
            localStorage.setItem('lang', this.languages[0].value);
            this._translate.use(this.selectedLanguage);
        }

        return localStorage.getItem('lang');
    }

    constructor(
        location: Location,
        private translate: TranslationService,
        private element: ElementRef,
        private router: Router,
        private _translate: TranslationService

    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this._translate.use(this.selectedLanguage);
        this.listTitles = ROUTES.filter(listTitle => listTitle);

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        if ($('body').hasClass('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if ($('body').hasClass('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        $('#minimizeSidebar').click(function () {
            if (misc.sidebar_mini_active === true) {
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            } else {
                setTimeout(function () {
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
        $('#hideSidebar').click(function () {
            if (misc.hide_sidebar_active === true) {
                setTimeout(function () {
                    $('body').removeClass('hide-sidebar');
                    misc.hide_sidebar_active = false;
                }, 300);
                setTimeout(function () {
                    $('.sidebar').removeClass('animation');
                }, 600);
                $('.sidebar').addClass('animation');

            } else {
                setTimeout(function () {
                    $('body').addClass('hide-sidebar');
                    // $('.sidebar').addClass('animation');
                    misc.hide_sidebar_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            const simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            const $layer = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
        });
    }

    ngAfterViewInit(): void {
        $('#changeMyPassModal').on('show.bs.modal', () => {
            this.oldPass = '';
            this.newPass = '';
            this.confirmPass = '';
            this.opened = true;
        });
        $('#changeMyPassModal').on('hide.bs.modal', () => {
            this.opened = false;
        });
    }

    onResize(event) {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        let titlee: any = this.location.prepareExternalUrl(this.location.path());
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === 'link' && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === 'sub') {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return this.translate.translate('Menu');
    }
    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    goToProfile(): void {
        this.router.navigate([`/configuracoes/perfil/`]);
    }


    showChangePass() {
        setTimeout(() => $('#changeMyPassModal').modal('show'), 100);
    }

    cofirmExit(): void {
        swal({
            title: this.translate.translate('Deseja sair da aplicação?'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: this.translate.translate('Sim'),
            cancelButtonText: this.translate.translate('Não'),
            buttonsStyling: false
        }).then(() => {
            this.logout();
        }).catch(swal.noop);
    }

    changeMyPassword() {
        // this.changePass.oldPassword = shajs('sha256').update(this.oldPass).digest('hex');
        // this.changePass.password = shajs('sha256').update(this.newPass).digest('hex');
        // this.changePass.token = this.userId;
        // this.loginService.changePassword(this.changePass).subscribe(
        //     success => {
        //         this.closeModal();
        //         ToastService.show('Senha alterada. É necessário logar novamente!', MessageType.SUCCESS);
        //         this.logout();
        //     },
        //     error => {
        //         console.log(error);
        //     }
        // );
    }

    closeModal(): void {
        this.oldPass = '';
        this.newPass = '';
        this.confirmPass = '';
        $('#changeMyPassModal').modal('hide');
    }

    verifyPass(): boolean {
        if (this.newPass.length < 6 || this.confirmPass.length < 6) {
            return false;
        } else if (this.newPass === this.confirmPass) {
            return true;
        } else {
            return false;
        }
    }

    logout(): void {
        // this.security.logOut();
    }
}
