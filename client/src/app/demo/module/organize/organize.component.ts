import { Component, ViewChild } from '@angular/core';
import { OrganizeService } from '../../service/organize.service';
import { IOrganize } from './model/organize.model';
import { Router } from '@angular/router';
import { OrganizeEditComponent } from './components/organize-edit/organize-edit.component';
import { ProfileService } from '../../service/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss'],
})
export class OrganizeComponent {
  @ViewChild(OrganizeEditComponent) organizeEditModal: OrganizeEditComponent;
  userId: number;
  organizes: IOrganize[] = [];

  constructor(
    private organizeService: OrganizeService,
    private router: Router,
    private profileService: ProfileService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.init();
    this.profileService.getByUserIdRef().subscribe((res) => {
      this.userId = res.data.id;
    });
  }

  init() {
    this.organizeService.getAll().subscribe(res => {
      this.organizes = res.data;
    });
  }

  onEdit(data: IOrganize) {
    this.organizeEditModal.toggle(true, data);
  }

  onDelete(data: IOrganize) {
    this.organizeService.delete(data.id).subscribe(() => {
      this.messageService.add({ summary: "Success", severity: "success" });
      this.init();
    })
  }

  onShowDetail(org: IOrganize) {
    this.router.navigate(['organize', org.id]);
  }

  onShowAdd() {
    this.organizeEditModal.toggle(true, null);
  }
}
