import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/module/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./demo/module/organize/organize.module').then(m => m.OrganizeModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./demo/module/profile/profile.module').then(m => m.ProfileModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./demo/module/auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
