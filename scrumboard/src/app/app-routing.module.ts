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
import {
  ArchivedBacklogComponent
} from "./components/project/archived-backlog/archived-backlog.component";
import {BoardComponent} from "./components/project/sprints/board/board.component";
import {BurndownComponent} from "./components/project/sprints/burndown/burndown.component";
import {MemberGuard} from "./guards/member.guard";

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
        path: ':projectId',
        children: [
          {
            path: 'backlog',
            component: BacklogComponent
          },
          {
            path: 'sprints',
            children: [
              {
                path: '',
                component: SprintsComponent
              },
              {
                path: ':sprintId',
                children: [
                  {
                    path: '',
                    component: BoardComponent
                  },
                  {
                    path: 'burndown',
                    component: BurndownComponent
                  }
                ]
              }
            ]
          },
          {
            path: 'archived-tasks',
            component: ArchivedBacklogComponent
          }
        ],
        canActivate: [MemberGuard]
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
