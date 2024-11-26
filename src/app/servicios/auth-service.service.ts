import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Variable para controlar el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verifica si el usuario está autenticado
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticatedSubject.next(true); // Usuario autenticado
    }
  }

  login() {
    // Simulación de login, por ejemplo, guardando en localStorage
    localStorage.setItem('user', 'someUser');
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    // Eliminar el usuario del localStorage para simular el logout
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }
}
