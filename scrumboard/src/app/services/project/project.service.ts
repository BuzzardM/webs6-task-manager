import {Injectable} from '@angular/core';
import {
  addDoc,
  collection, collectionData, doc, Firestore, query, setDoc, where,
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
    return collectionData(q, {idField: 'id'}) as Observable<IProject[]>;
  }

  addProject(project: IProject) {
    const projectsRef = collection(this.db, 'projects');
    return addDoc(projectsRef, project);
  }

  updateProject(project: IProject) {
    let projectId = project.id;
    delete project.id;

    const projectRef = doc(this.db, `projects/${projectId}`);
    return setDoc(projectRef, project);
  }
}
