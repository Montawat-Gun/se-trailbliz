import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizeRoutingModule } from './organize-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizeComponent } from './organize.component';
import { OrganizeDetailComponent } from './components/organize-detail/organize-detail.component';
import { OrganizeEditComponent } from './components/organize-edit/organize-edit.component';
import { OrganizeService } from '../../service/organize.service';
import { ChatComponent } from './components/chat/chat.component';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [OrganizeComponent, OrganizeDetailComponent, OrganizeEditComponent, ChatComponent],
  imports: [FormsModule, ReactiveFormsModule, OrganizeRoutingModule, CommonModule, DialogModule, InputNumberModule, ButtonModule, InputTextModule, CalendarModule],
  providers: [OrganizeService],
})
export class OrganizeModule { }
