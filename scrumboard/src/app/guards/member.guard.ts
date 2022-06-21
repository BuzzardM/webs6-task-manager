import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {lastValueFrom, take} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project/project.service";
import {IProject} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private auth: AuthService, private projectService: ProjectService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.auth.getUser()) return false;

    const projectId = route.paramMap.get('projectId');
    if (!projectId) return false;
    let project: IProject = await lastValueFrom(this.projectService.getProject(projectId).pipe(take(1)));
    if (project && project.members.includes(this.auth.getUser()!.email!)) return true;
    return false;
  }
}
