import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "home",
    component: HomeComponent
  }
];
