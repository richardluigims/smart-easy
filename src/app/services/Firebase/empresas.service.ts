import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  collectionName: string = "EMPRESAS";

  constructor(
    private firestore: Firestore
  ) { }

  GetEmpresaById(idEmpresa: string) {
    let empresaRef = doc(this.firestore, this.collectionName + '/' + idEmpresa);

    return getDoc(empresaRef);
  }
}
