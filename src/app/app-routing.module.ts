import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubmitComponent } from './submit/submit.component';
import { ModalSubmitComponent } from './modal-submit/modal-submit.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: ":user/:image",
        component: ModalSubmitComponent
      }
    ]
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "account/:user",
    component: AccountComponent,
    children: [
      {
        path: ":image",
        component: ModalSubmitComponent
      }
    ]
  },
  {
    path: "submit",
    component: SubmitComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
