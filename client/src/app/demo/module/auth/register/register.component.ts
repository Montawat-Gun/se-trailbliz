import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
  });

  userTypes: { name: string; value: string }[] = [
    { name: 'ผู้จัดงาน', value: 'host' },
    { name: 'นักวิ่ง', value: 'participant' },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    const data = {
      username: this.form.value.username,
      password: this.form.value.password,
      userType: this.form.value.type.value ?? 'participant',
    };
    this.authService
      .register(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.router.navigate(['auth', 'login']);
      });
  }
}
