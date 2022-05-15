import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
