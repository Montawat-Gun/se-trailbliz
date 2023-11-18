import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRouterModule } from './profile-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRouterModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, CalendarModule],
})
export class ProfileModule {}
