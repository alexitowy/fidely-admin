import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp
} from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  TwitterAuthProvider,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { Company } from '../models/interfaces/user.model';
import { SignInProvider } from '../models/enums/singInProvider.enum';

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

  async signInWithSocialNetwork(provider: SignInProvider): Promise<User> {
    let result: any;
    try {
      switch (provider) {
        /* case SignInProvider.apple:
          result = await this.firebaseAuthService.signInWithApple();
          break; */
        case SignInProvider.facebook:
          result = await this.auth.signInWithPopup(this.facebookProvider);
          break;
        case SignInProvider.google:
          result = await this.auth.signInWithPopup(this.googleProvider);
          break;
        case SignInProvider.twitter:
          result = await this.auth.signInWithPopup(this.twitterProvider);
          break;
      }
      return result.user as User;
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  }

  async linkWithSocialNetwork(provider: SignInProvider): Promise<User> {
    try {
      let result: any;
      switch (provider) {
        /* case SignInProvider.apple:
          result = await this.firebaseAuthService.signInWithApple();
          break; */
        case SignInProvider.facebook:
          result = await linkWithPopup(getAuth().currentUser, this.facebookProvider);
          break;
        case SignInProvider.google:
          result = await linkWithPopup(getAuth().currentUser, this.googleProvider);
          break;
        case SignInProvider.twitter:
          result = await linkWithPopup(getAuth().currentUser, this.twitterProvider);
          break;
      }
      return result.user as User;
    } catch (error) {
      console.error('Error al vincular la cuenta:', error);
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
