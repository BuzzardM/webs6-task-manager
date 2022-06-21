import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {lastValueFrom, take} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project/project.service";
import {IProject} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private auth: AuthService, private projectService: ProjectService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (this.auth.getUser()) {
      const projectId = route.paramMap.get('projectId');
      if (projectId) {
        const project: IProject = await lastValueFrom(this.projectService.getProject(projectId).pipe(take(1)));
        if (project && project.members.includes(this.auth.getUser()!.email!)) return true;
      }
    }
    return this.router.parseUrl('/home');
  }
}
