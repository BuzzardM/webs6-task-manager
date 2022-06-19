import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ArchivedProjectsComponent} from "./components/projects/archived-projects/archived-projects.component";
import {BacklogComponent} from "./components/project/backlog/backlog.component";
import {SprintsComponent} from "./components/project/sprints/sprints.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: SignInComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsComponent
      },
      {
        path: ':uid/backlog',
        component: BacklogComponent
      },
      {
        path: ':uid/sprints',
        component: SprintsComponent,
      }
    ],
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'archived-projects',
    component: ArchivedProjectsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
