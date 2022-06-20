import {Injectable} from '@angular/core';
import {
  addDoc,
  collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ITask} from "../../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: Firestore) {
  }

  getProjectTasks(projectId: string): Observable<ITask[]> {
    const q = query(collection(this.db, 'tasks'), where('project_id', '==', projectId));
    return collectionData(q, {idField: 'id'}) as Observable<ITask[]>;
  }

  getArchivedProjectTasks(projectId: string): Observable<ITask[]> {
    const q = query(collection(this.db, 'archived_tasks'), where('project_id', '==', projectId));
    return collectionData(q, {idField: 'id'}) as Observable<ITask[]>;
  }

  addTask(task: ITask) {
    const taskRef = collection(this.db, 'tasks');
    return addDoc(taskRef, task);
  }

  updateTask(task: ITask) {
    let taskId = task.id;
    delete task.id;

    const taskRef = doc(this.db, `tasks/${taskId}`);
    return setDoc(taskRef, task);
  }

  archiveTask(task: ITask) {
    let taskId = task.id;
    const taskRef = doc(this.db, `tasks/${taskId}`);

    deleteDoc(taskRef).then(() => {
      delete task.id;
      const archiveRef = collection(this.db, 'archived_tasks');
      return addDoc(archiveRef, task);
    });
  }

  restoreTask(task: ITask) {
    let taskId = task.id;
    const taskRef = doc(this.db, `archived_tasks/${taskId}`);

    deleteDoc(taskRef).then(() => {
      delete task.id;
      const archiveRef = collection(this.db, 'tasks');
      return addDoc(archiveRef, task);
    });
  }
}
