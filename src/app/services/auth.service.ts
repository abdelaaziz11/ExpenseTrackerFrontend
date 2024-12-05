import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth'; // Change l'import pour utiliser AngularFire

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Inscription
  async signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Connexion
  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Déconnexion
  async logout() {
    return await signOut(this.auth);
  }

  // Observer l'utilisateur connecté
  onAuthStateChanged(callback: (user: any) => void) {
    onAuthStateChanged(this.auth, callback);
  }

  // Méthode pour récupérer l'utilisateur connecté
  getUser(): Promise<User | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user); // Renvoie l'utilisateur connecté ou `null` s'il n'y a pas d'utilisateur
      });
    });
  }
}
