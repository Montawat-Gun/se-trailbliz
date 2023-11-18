import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrganize } from '../../model/organize.model';
import { OrganizeService } from 'src/app/demo/service/organize.service';
import { finalize } from 'rxjs';
import { ProfileService } from 'src/app/demo/service/profile.service';

@Component({
  selector: 'app-organize-edit',
  templateUrl: './organize-edit.component.html',
  styleUrls: ['./organize-edit.component.scss'],
})
export class OrganizeEditComponent {
  @Output() submit = new EventEmitter<any>();
  isShowModal: boolean = false;
  editLoading: boolean = false;

  organizeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    capability: new FormControl('', Validators.required),
    distanceKm: new FormControl('', Validators.required),
    fee: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    createByUserId: new FormControl(null, Validators.required),
  });

  constructor(private orgService: OrganizeService, private profileService: ProfileService) { }

  toggle(value: boolean, org: IOrganize) {
    this.organizeForm.patchValue(org);
    this.isShowModal = value;
  }

  onSubmit() {
    const userId = this.profileService.user.id;
    this.organizeForm.patchValue({ createByUserId: userId });
    this.editLoading = true;
    this.orgService
      .create(this.organizeForm.value)
      .pipe(finalize(() => (this.editLoading = false)))
      .subscribe((res) => {
        this.submit.emit(res.data);
        this.isShowModal = false;
      });
  }
}
