import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IVacancieRequest, IVacancieResponse } from '../../interfaces/vacancie/vacancie.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData, collection,DocumentData
} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class VacancieService {

  private vacancieCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.vacancieCollection = collection(this.afs, 'vacancies');
  }


  getAllFirebase() {
    return collectionData(this.vacancieCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const actionDocumentReference = doc(this.afs, `vacancies/${id}`);
    return docData(actionDocumentReference, { idField: 'id' });
  }

  createFirebase(category: IVacancieRequest) {
    return addDoc(this.vacancieCollection, category);
  }

  updateFirebase(category: IVacancieRequest, id: string) {
    const actionDocumentReference = doc(this.afs, `vacancies/${id}`);
    return updateDoc(actionDocumentReference, {...category});
  }

  deleteFirebase(id: string) {
    const actionDocumentReference = doc(this.afs, `vacancies/${id}`);
    return deleteDoc(actionDocumentReference);
  }

}
