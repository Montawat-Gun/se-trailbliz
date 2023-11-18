import { Component, ViewChild } from '@angular/core';
import { OrganizeService } from '../../service/organize.service';
import { IOrganize } from './model/organize.model';
import { Router } from '@angular/router';
import { OrganizeEditComponent } from './components/organize-edit/organize-edit.component';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss'],
})
export class OrganizeComponent {
  @ViewChild(OrganizeEditComponent) organizeEditModal: OrganizeEditComponent;

  organizes: IOrganize[] = [];

  constructor(
    private organizeService: OrganizeService,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.init();
    this.profileService.getByUserIdRef().subscribe();
  }

  init() {
    this.organizeService.getAll().subscribe(res => {
      this.organizes = res.data;
    });
  }

  onEdit(data: IOrganize) {
    this.organizeEditModal.toggle(true, data);
  }

  onShowDetail(org: IOrganize) {
    this.router.navigate(['organize', org.id]);
  }

  onShowAdd() {
    this.organizeEditModal.toggle(true, null);
  }
}
