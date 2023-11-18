import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import { AuthenticationService } from '../../service/authentication.service';
import { finalize, mergeMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    disease: new FormControl('', Validators.required),
    foodAllergies: new FormControl('', Validators.required),
    type: new FormControl({ value: 'host', disabled: true }, Validators.required),
  });

  genders: string[] = ['ชาย', 'หญิง', 'อื่น ๆ'];

  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.profileService.getByUserIdRef().subscribe((res: any) => {

    });
  }

  onSubmit() {
    this.loading = true;
    this.profileService.create(this.profileForm.value).pipe(finalize(() => this.loading = false)).subscribe((res) => {
      console.log(res);
    })
  }
}
