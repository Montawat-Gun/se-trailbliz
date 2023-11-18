import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRouterModule } from './profile-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRouterModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
})
export class ProfileModule {}
