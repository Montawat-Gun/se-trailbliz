import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrganize } from '../../model/organize.model';
import { OrganizeService } from 'src/app/demo/service/organize.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { finalize, mergeMap } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-organize-detail',
  templateUrl: './organize-detail.component.html',
  styleUrls: ['./organize-detail.component.scss'],
})
export class OrganizeDetailComponent implements OnInit {
  @ViewChild(ChatComponent) chat: ChatComponent;

  private readonly id: number;
  applyLoading: boolean = false;

  organizeForm: FormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    description: new FormControl({ value: '', disabled: true }, Validators.required),
    capability: new FormControl({ value: '', disabled: true }, Validators.required),
    distanceKm: new FormControl({ value: '', disabled: true }, Validators.required),
    fee: new FormControl({ value: '', disabled: true }, Validators.required),
    startDate: new FormControl({ value: '', disabled: true }, Validators.required),
    endDate: new FormControl({ value: '', disabled: true }, Validators.required),
    reward: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  constructor(
    route: ActivatedRoute,
    private organizeService: OrganizeService,
    private authService: AuthenticationService
  ) {
    this.id = Number(route.snapshot.paramMap.get('organizeId'));
  }

  ngOnInit(): void {
    this.organizeService.get(this.id).subscribe(res => {
      this.organizeForm.patchValue(res);
    });
  }

  onApply() {
    this.applyLoading = true;
    this.authService.user$
      .pipe(
        finalize(() => (this.applyLoading = false)),
        mergeMap(user => {
          const data = {
            organizeId: this.id,
            userId: user.userId,
            userName: user.userName,
            userType: user.userType,
          };
          return this.organizeService.applyOrganize(data);
        })
      )
      .subscribe();
  }

  onOpenGroupChat() {
    this.chat.toggle(true, this.id);
  }
}
