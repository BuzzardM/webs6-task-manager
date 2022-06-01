import {Injectable} from '@angular/core';
import {
  addDoc,
  collection, collectionData, collectionGroup, docData,
  Firestore, getDocs, query, where,
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

  getProjects(userId: string): void {
    const q = query(collectionGroup(this.db, 'members'), where('user_id', '==', userId));
    let result = [{}];

    getDocs(q).then((snap) => {
      snap.forEach((doc) => {
        let project;
        let member = doc.data() as Observable<IUser>;

        if(doc.ref.parent.parent != null){
          project = docData(doc.ref.parent.parent) as Observable<IProject>;
        }
      })
    });
  }

  addProject(project: IProject, userId: string) {
    const projectsRef = collection(this.db, 'projects');
    const projectsUsersRef = collection(this.db, 'projects_users');
  }
}
