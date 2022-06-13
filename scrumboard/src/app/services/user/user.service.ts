import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../models/user";
import {Firestore, doc, docData, collection, addDoc, setDoc, getDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: Firestore) {
  }

  getUser(email: string): Observable<IUser> {
    const usersRef = doc(this.db, `users/${email}`);
    return docData(usersRef, {idField: 'email'}) as Observable<IUser>;
  }

  addUser(user: IUser) {
    let email = user.email;
    delete user.email;

    const usersRef = collection(this.db, 'users');
    return setDoc(doc(usersRef, email), user);
  }

  async userExists(email: string): Promise<boolean> {
    let result: boolean = false;

    const usersRef = doc(this.db, `users/${email}`);
    await getDoc(usersRef).then((doc) => {
      result = !!doc.exists();
    })

    return result;
  }
}
