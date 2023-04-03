import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData
} from "@angular/fire/firestore";
import {collection, DocumentData} from "@firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ThaiService {

  private categoryCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.categoryCollection = collection(this.afs, 'thai');
  }


  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `thai/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `thai/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `thai/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
