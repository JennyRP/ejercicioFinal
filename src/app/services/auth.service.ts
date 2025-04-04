import { Injectable } from '@angular/core';
import { Auth, user, User, browserSessionPersistence, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) { 
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence).catch(error => {
      console.error("Error al establecer la persistencia:", error);
    });
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {
        console.log('Usuario autenticado correctamente');
      })
    );
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    return from(
      signOut(this.firebaseAuth).then(() => {
        console.log('Sesión cerrada correctamente');
      })
    );
  }
}
