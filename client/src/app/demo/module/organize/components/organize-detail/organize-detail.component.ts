import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrganize } from '../../model/organize.model';
import { OrganizeService } from 'src/app/demo/service/organize.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { finalize, mergeMap } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';
import { ProfileService } from 'src/app/demo/service/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-organize-detail',
  templateUrl: './organize-detail.component.html',
  styleUrls: ['./organize-detail.component.scss'],
})
export class OrganizeDetailComponent implements OnInit {
  @ViewChild(ChatComponent) chat: ChatComponent;

  private readonly id: number;
  private chatId: string;
  applyLoading: boolean = false;
  isJoined: boolean = false;

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
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.id = Number(route.snapshot.paramMap.get('organizeId'));
  }

  ngOnInit(): void {
    this.profileService.getByUserIdRef().pipe(mergeMap(() => {
      return this.organizeService.get(this.id);
    })).subscribe((res) => {
      this.isJoined = res.data.UsersOrganize.some(x => x.userId === this.profileService.user.id);
      this.organizeForm.patchValue(res.data);
      this.cdr.markForCheck();
      this.chatId = res.data.chatId;
    })

  }

  onApply() {
    this.applyLoading = true;
    this.profileService.getByUserIdRef()
      .pipe(
        finalize(() => (this.applyLoading = false)),
        mergeMap(user => {
          const data = {
            organizeId: this.id,
            userId: user.data.id,
            userName: user.data.email,
            userType: localStorage.getItem('user_type'),
          };
          return this.organizeService.applyOrganize(data);
        })
      )
      .subscribe(() => {
        this.messageService.add({ summary: "Success", severity: "success" });
        this.isJoined = true;
      });
  }

  onOpenGroupChat() {
    this.chat.toggle(true, this.chatId);
  }
}
