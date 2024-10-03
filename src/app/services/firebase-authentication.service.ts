import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GoogleAuthProvider,
  User,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithCustomToken
} from 'firebase/auth';
import { Company, Employee } from '../models/interfaces/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  addDoc,
  collection,
  query,
  updateDoc,
  getDocs,
  deleteDoc,
  where,
  WhereFilterOp
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  uploadString,
  getStorage,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly storage: AngularFireStorage
  ) {}

  facebookProvider = new FacebookAuthProvider();
  twitterProvider = new TwitterAuthProvider();
  googleProvider = new GoogleAuthProvider();

  //===== Authentication ===========
  getAuth() {
    return getAuth();
  }

  async signIn(user: Company) {
    return (
      await signInWithEmailAndPassword(getAuth(), user.email, user.password)
    ).user;
  }

  async signInWithFacebook(): Promise<User> {
    try {
      const result = await this.auth.signInWithPopup(this.facebookProvider);
      const user = result.user;
      return user;
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  }

  async signInWithTwitter(): Promise<User> {
    try {
      const result = await this.auth.signInWithPopup(this.twitterProvider);
      const user = result.user;
      return user;
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await this.auth.signInWithPopup(this.googleProvider);
      const user = result.user;
      return user;
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  }

  async signOut() {
    await signOut(getAuth());
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(getAuth(), email);
  }

  updateUser(user: Company) {
    return updateProfile(getAuth().currentUser, {
      displayName: user.companyName,
    });
  }

  async register(user: any) {
    return (
      await createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    ).user;
  }

  //======== Database =============
  //======== setDocument =========
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  async deleteDocument(path: string) {
    return (await deleteDoc(doc(getFirestore(), path)));
  }

  async getCollection(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    const q = query(ref, collectionQuery);

    // Obtener los documentos de la colección
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
  }

  //========= Almacenamiento =================
  //===== Subir imagen ==========
  async uploadImage(path: string, data_url: string) {
    const storageRef = ref(getStorage(), path);
    await uploadString(storageRef, data_url, 'data_url');
    return getDownloadURL(storageRef);
  }

  getFilePath() {}

  async getDocumentsByParam(path: string, param: string, condition: WhereFilterOp, value: string) {
    const ref = collection(getFirestore(), path);
    const q = query(ref, where(param, condition, value));

    // Obtener los documentos de la colección
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data } as any;
    });
  }
}
