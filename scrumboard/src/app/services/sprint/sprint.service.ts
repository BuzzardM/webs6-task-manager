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
import {ITask} from "../../models/task";
import {ISprint} from "../../models/sprint";

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

  getSprint(sprintId: string) {
    const sprintRef = doc(this.db, `sprints/${sprintId}`);
    return docData(sprintRef) as Observable<ISprint>;
  }

  addSprint(sprint: ISprint) {
    const sprintsRef = collection(this.db, 'sprints');
    return addDoc(sprintsRef, sprint);
  }

  updateSprint(sprint: ISprint) {
    const sprintId = sprint.id;
    const { id, ...rest } = sprint;

    const sprintRef = doc(this.db, `sprints/${sprintId}`);
    return setDoc(sprintRef, rest);
  }

  getSprintTasks(sprintId: string) {
    const q = query(collection(this.db, 'tasks'), where('assigned_sprint', '==', sprintId));
    return collectionData(q, {idField: 'id'}) as Observable<ITask[]>;
  }

  getUnassignedTasks(sprintId: string, projectId: string) {
    const q = query(collection(this.db, 'tasks'),
      where('assigned_sprint', '==', null),
      where('project_id', '==', projectId))
    return collectionData(q, {idField: 'id'}) as Observable<ITask[]>;
  }
}
