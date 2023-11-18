import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizeComponent } from './organize.component';
import { OrganizeDetailComponent } from './components/organize-detail/organize-detail.component';

const routes: Routes = [
  { path: '', component: OrganizeComponent },
  { path: 'organize/:organizeId', component: OrganizeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizeRoutingModule {}
