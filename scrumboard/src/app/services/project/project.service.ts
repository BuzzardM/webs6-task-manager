import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {IUser} from "../../models/user";
import {IProject} from "../../models/project";
import {IProjectsUsers} from "../../models/projects_users";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: Firestore) {
  }

  getProjects(userId: string): Observable<IProjectsUsers[]> {
    // const q = query(collection(this.db, 'projects_users'), where('user_id', '==', userId))

    const projectsRef = collection(this.db, 'projects_users');
    return collectionData(projectsRef) as Observable<IProjectsUsers[]>;
  }

  addProject(project: IProject, userId: string) {
    const projectsRef = collection(this.db, 'projects');
    const projectsUsersRef = collection(this.db, 'projects_users');

    addDoc(projectsRef, project).then( docRef => {
      let projectUser: IProjectsUsers = {
        project_id: docRef.id,
        user_id: userId,
        role: 'owner'
      }

      return addDoc(projectsUsersRef, projectUser);
    });
  }
}
