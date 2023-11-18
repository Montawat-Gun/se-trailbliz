import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
  });

  userTypes: { name: string; value: string }[] = [
    { name: 'ผู้จัดงาน', value: 'ORGANIZER' },
    { name: 'นักวิ่ง', value: 'APPLICANT' },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    const data = {
      username: this.form.value.username,
      password: this.form.value.password,
      type: this.form.value.type.value ?? 'APPLICANT',
    };
    this.authService.register(data).subscribe(() => {
      this.router.navigate(['auth', 'login']);
    });
  }
}
