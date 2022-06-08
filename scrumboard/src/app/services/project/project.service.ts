import {Injectable} from '@angular/core';
import {
  collection, collectionData, doc, docData, Firestore, query, setDoc, where,
} from "@angular/fire/firestore";
import {IProject} from "../../models/project";
import {Observable} from "rxjs";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: Firestore) {
  }

  getProjects(userId: string): Observable<IProject[]> {
    const q = query(collection(this.db, 'projects'), where('members', 'array-contains', userId));
    return collectionData(q, {idField: 'id'}) as Observable<IProject[]>;
  }

  addProject(project: IProject, userId: string) {
    const projectsRef = collection(this.db, 'projects');
    const projectsUsersRef = collection(this.db, 'projects_users');
  }

  updateProject(project: IProject) {
    let projectId = project.id;
    delete project.id;

    const projectRef = doc(this.db, `projects/${projectId}`);
    return setDoc(projectRef, project);
  }
}
