import {Injectable} from '@angular/core';
import {
  collection, collectionData, Firestore, query, where,
} from "@angular/fire/firestore";
import {IProject} from "../../models/project";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: Firestore) {
  }

  getProjects(userId: string): Observable<IProject[]> {
    const q = query(collection(this.db, 'projects'), where('members', 'array-contains', userId));
    return collectionData(q) as Observable<IProject[]>;
  }

  addProject(project: IProject, userId: string) {
    const projectsRef = collection(this.db, 'projects');
    const projectsUsersRef = collection(this.db, 'projects_users');
  }
}
