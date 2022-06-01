import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    return signOut(this.auth);
  }

  public getUser() {
    return this.auth.currentUser;
  }
}
