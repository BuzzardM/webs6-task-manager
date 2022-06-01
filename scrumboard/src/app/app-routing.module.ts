import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: SignUpComponent},
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['login'])}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
