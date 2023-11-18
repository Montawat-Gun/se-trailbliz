import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrganize } from '../../model/organize.model';
import { OrganizeService } from 'src/app/demo/service/organize.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-organize-edit',
  templateUrl: './organize-edit.component.html',
  styleUrls: ['./organize-edit.component.scss'],
})
export class OrganizeEditComponent {
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
  });

  constructor(private orgService: OrganizeService) {}

  toggle(value: boolean, org: IOrganize) {
    this.organizeForm.patchValue(org);
    this.isShowModal = value;
  }

  onSubmit() {
    this.editLoading = true;
    this.orgService
      .create(this.organizeForm.value)
      .pipe(finalize(() => (this.editLoading = false)))
      .subscribe();
  }
}
