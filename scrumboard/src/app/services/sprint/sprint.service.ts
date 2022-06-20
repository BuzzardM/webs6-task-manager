import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ITask} from "../../models/task";
import {ISprint} from "../../models/sprint";
import {IProject} from "../../models/project";

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private db: Firestore) {
  }

  getProjectSprints(projectId: string): Observable<ISprint[]> {
    const q = query(collection(this.db, 'sprints'), where('project_id', '==', projectId));
    return collectionData(q, {idField: 'id'}) as Observable<ISprint[]>;
  }

  addSprint(sprint: ISprint) {
    const sprintsRef = collection(this.db, 'sprints');
    return addDoc(sprintsRef, sprint);
  }
}
