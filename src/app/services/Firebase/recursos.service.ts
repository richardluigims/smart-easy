import { Injectable, signal } from '@angular/core';
import { collection, doc, docData, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  collectionName: string = "RECURSOS";
  private currentRecursoData = new BehaviorSubject<any>(null);

  constructor(
      private firestore: Firestore
    ) { }

    GetRecursosByAmbiente(idAmbiente: any) {
      const recursosRef = collection(this.firestore, this.collectionName);
      let condition = where('idAmbiente', '==', idAmbiente);
      const q = query(recursosRef, condition);

      return getDocs(q).then((snapshot) => 
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    }

    WatchRecursoChanges(docId: string) {
      const documentRef = doc(this.firestore, this.collectionName + "/" + docId);

      return docData(documentRef);
    }

    UpdateEstadoAtual(docId: string, estadoAtual: any) {
      const documentRef = doc(this.firestore, this.collectionName + "/" + docId);
      return updateDoc(documentRef, {
        estadoAtual: estadoAtual
      });
    }

    GetRecursosByTipo(codTipoRecurso: string, idEmpresa: string) {
      const recursosRef = collection(this.firestore, this.collectionName);

      let conditionTipoRecurso = where("codTipoRecurso", "==", codTipoRecurso);
      let conditionEmpresa = where("idEmpresa", "==", idEmpresa);

      let q = query(recursosRef, conditionTipoRecurso, conditionEmpresa);

      return getDocs(q).then((snapshot) => 
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    }

    SetCurrentRecursoData(userData: any) {
      this.currentRecursoData.next(userData); // Atualiza o valor do BehaviorSubject
    }
  
    GetCurrentRecursoData(): Observable<any> {
      return this.currentRecursoData.asObservable(); // Retorna o observable para se inscrever
    }
}
