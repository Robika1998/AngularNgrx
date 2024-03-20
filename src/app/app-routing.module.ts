import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociatelistingComponent } from './component/associatelisting/associatelisting.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'associate',component:AssociatelistingComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
