import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbientesService {
  private currentAmbienteData = new BehaviorSubject<any>(null);

  constructor(
    private firestore: Firestore
  ) { }

  GetAmbientesByEmpresa(idEmpresa: any) {
    const ambientesRef = collection(this.firestore, 'AMBIENTE_EMPRESA');
    const q = query(ambientesRef, where('idEmpresa', '==', idEmpresa));
  
    return getDocs(q).then((snapshot) => 
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  }

  GetAmbienteById(idAmbiente: string) {
    const docRef = doc(this.firestore, "AMBIENTE_EMPRESA", idAmbiente);

    return getDoc(docRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        return null;
      }
    });
  }

  SetCurrentAmbienteData(userData: any) {
    this.currentAmbienteData.next(userData); // Atualiza o valor do BehaviorSubject
  }

  GetCurrentAmbienteData(): Observable<any> {
    return this.currentAmbienteData.asObservable(); // Retorna o observable para se inscrever
  }
}
