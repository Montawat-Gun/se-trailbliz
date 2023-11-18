import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/module/notfound/notfound.component';
import { IconService } from './demo/service/icon.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './demo/service/base-url.interceptor';
import { ErrorInterceptor } from './demo/service/error.interceptor';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule],
  providers: [IconService, { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
