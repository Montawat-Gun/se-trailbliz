import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/module/notfound/notfound.component';
import { IconService } from './demo/service/icon.service';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule],
  providers: [IconService],
  bootstrap: [AppComponent],
})
export class AppModule {}
