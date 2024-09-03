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
} from 'firebase/auth';
import { UserForm } from '../models/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor(private readonly auth: AngularFireAuth) {}

  facebookProvider = new FacebookAuthProvider();
  twitterProvider = new TwitterAuthProvider();
  googleProvider = new GoogleAuthProvider();

  //===== Authentication ===========
  async signIn(user: UserForm) {
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

  public async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(getAuth(), email);
  }
}
