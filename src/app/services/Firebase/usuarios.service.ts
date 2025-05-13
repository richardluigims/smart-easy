import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { getFirestore, doc, getDoc, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);

  constructor(private firestore: Firestore) {}

  GetUsuario(userUID: string) {
    let userRef = doc(this.firestore, 'USUARIOS/' + userUID);

    return getDoc(userRef);
  }

  SetLoggedInUserData(userData: any) {
    this.loggedInUserSubject.next(userData);
  }

  GetLoggedInUserData(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }
}
