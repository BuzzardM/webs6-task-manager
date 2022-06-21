import {Injectable} from '@angular/core';
import {
  addDoc,
  collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, query, setDoc, updateDoc, where,
} from "@angular/fire/firestore";
import {IProject} from "../../models/project";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: Firestore) {
  }

  getProject(projectId: string): Observable<IProject> {
    const projectRef = doc(this.db, `projects/${projectId}`);
    return docData(projectRef) as Observable<IProject>;
  }

  getProjects(userId: string): Observable<IProject[]> {
    const q = query(collection(this.db, 'projects'), where('members', 'array-contains', userId));
    return collectionData(q, {idField: 'id'}) as Observable<IProject[]>;
  }

  getArchivedProjects(userId: string): Observable<IProject[]> {
    const q = query(collection(this.db, 'archived_projects'), where('members', 'array-contains', userId));
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

  archiveProject(project: IProject) {
    let projectId = project.id;
    const projectRef = doc(this.db, `projects/${projectId}`);

    deleteDoc(projectRef).then(() => {
      delete project.id;
      const archiveRef = collection(this.db, 'archived_projects');
      return addDoc(archiveRef, project);
    });
  }

  restoreProject(project: IProject) {
    let projectId = project.id;
    const projectRef = doc(this.db, `archived_projects/${projectId}`);

    deleteDoc(projectRef).then(() => {
      delete project.id;
      const archiveRef = collection(this.db, 'projects');
      return addDoc(archiveRef, project);
    });
  }

  setActiveSprint(sprintId: string, projectId: string) {
    const projectRef = doc(this.db, `projects/${projectId}`);
    return updateDoc(projectRef, {active_sprint: sprintId});
  }
}
