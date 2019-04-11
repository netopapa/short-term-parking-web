import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InterceptedHttp } from 'app/service/interceptor/interceptor.service';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SecurityService } from './guards/security.service';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AreaSimpleService } from './service/area-simple/area-simple.service';
import { AreaService } from './service/area/area.service';
import { CameraService } from './service/camera/camera.service';
import { EmployeeSimpleService } from './service/employee-simple/employee-simple.service';
import { EmployeeService } from './service/employee/employee.service';
import { FileService } from './service/file/file.service';
import { LoaderService } from './service/loader/loader-service';
import { LoginService } from './service/login/login.service';
import { ProductionLineSimpleService } from './service/productionLine-simple/production-line-simple.service';
import { ProductionLineService } from './service/productionLine/production-line.service';
import { RestService } from './service/rest/rest.service';
import { SectorSimpleService } from './service/sector-simple/sector-simple.service';
import { SectorService } from './service/sector/sector.service';
import { StationSimpleService } from './service/station-simple/station-simple.service';
import { StationService } from './service/station/station.service';
import { ErrorService } from './service/toast-notification-service/error-service/error.service';
import { ToastService } from './service/toast-notification-service/toast-service/toast.service';
import { TranslationService } from './service/translation/translation.service';
import { UnitService } from './service/unit/unit.service';
import { UserService } from './service/user/user.service';
import { VisitorService } from './service/visitor/visitor.service';
import { FixedpluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { LoadingComponent } from './shared/loading/loading.component';
import { MadiaAttachmentModule } from './shared/media-attachment/media-attachment.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { TRANSLATION_PROVIDERS } from './shared/translation/translations';
import { SidebarModule } from './sidebar/sidebar.module';
import { GateService } from './service/gate/gate.service';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, loaderService: LoaderService): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, loaderService);
}

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MadiaAttachmentModule
  ],
  declarations: []
})
export class MaterialModule { }

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    HttpModule,
    MaterialModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoadingComponent,
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    },
    RestService,
    FileService,
    ToastService,
    ErrorService,
    LoaderService,
    TranslationService,
    TRANSLATION_PROVIDERS,
    AreaService,
    AreaSimpleService,
    EmployeeService,
    EmployeeSimpleService,
    ProductionLineService,
    ProductionLineSimpleService,
    SectorService,
    SectorSimpleService,
    StationService,
    StationSimpleService,
    UnitService,
    VisitorService,
    UserService,
    CameraService,
    GateService,
    SecurityService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
