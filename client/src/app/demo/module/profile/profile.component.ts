import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import { AuthenticationService } from '../../service/authentication.service';
import { finalize, mergeMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: number;
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
    type: new FormControl({ value: localStorage.getItem('user_type'), disabled: true }, Validators.required),
  });

  genders: string[] = ['ชาย', 'หญิง', 'อื่น ๆ'];

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.profileService.getByUserIdRef().subscribe((res: any) => {
      if (res.data) {
        this.id = res.data.id;
        this.profileForm.patchValue({ ...res.data, type: localStorage.getItem('user_type'), birthDate: new Date(res.data.birthDate) });
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const userIdRef = localStorage.getItem('user_id_ref');
    const userType = localStorage.getItem('user_type');
    if (this.id) {
      this.profileService.update(this.id, this.profileForm.getRawValue()).pipe(finalize(() => this.loading = false)).subscribe((res) => {
        console.log(res);
        this.messageService.add({ summary: "Success", severity: "success" });
      })
    } else {
      this.profileService.create({ ...this.profileForm.getRawValue(), userIdRef: userIdRef, type: userType }).pipe(finalize(() => this.loading = false)).subscribe((res) => {
        console.log(res);
        this.messageService.add({ summary: "Success", severity: "success" });
      })
    }
  }
}
