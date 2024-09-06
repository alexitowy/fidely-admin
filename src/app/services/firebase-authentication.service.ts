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
  updateProfile, signOut
} from 'firebase/auth';
import { Company } from '../models/interfaces/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, getDoc, doc, addDoc, collection, query, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  facebookProvider = new FacebookAuthProvider();
  twitterProvider = new TwitterAuthProvider();
  googleProvider = new GoogleAuthProvider();

  //===== Authentication ===========
  getAuth(){
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
      console.log(result.user);
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
      console.log(result.user);
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
      console.log(result.user);
      return user;
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      throw error;
    }
  }

  async signOut(){
    await signOut(getAuth());
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(getAuth(), email);
  }

  updateUser(user: Company){
    return updateProfile(getAuth().currentUser, { displayName:user.companyName});
  }

  async register(user: Company) {
    return (
      await createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    ).user;
  }

  //======== Database =============
  //======== setDocument =========
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(), path), data);
  }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  getCollection(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery));
  }

}
