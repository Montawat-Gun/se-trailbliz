import { Component, ViewChild } from '@angular/core';
import { OrganizeService } from '../../service/organize.service';
import { IOrganize } from './model/organize.model';
import { Router } from '@angular/router';
import { OrganizeEditComponent } from './components/organize-edit/organize-edit.component';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.organizeService.getAll().subscribe(res => {
      this.organizes = res;
    });
  }

  gotoMap(data: { lat: number; lng: number }) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`, '_blank');
  }

  onShowDetail(org: IOrganize) {
    this.router.navigate(['organize', org.id]);
  }

  onShowAdd() {
    this.organizeEditModal.toggle(true, null);
  }
}
