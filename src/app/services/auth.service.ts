import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private apiUrl = 'http://127.0.0.1:8000/api'; // URL base

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de usuario
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(() => new Error('Registro fallido. Inténtalo más tarde.'));
      })
    );
  }

  // Inicio de sesión (login)
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user)); // Almacenar datos del usuario
        this.isAuthenticatedSubject.next(true); // Cambia el estado a "autenticado"
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Credenciales incorrectas. Inténtalo de nuevo.'));
      })
    );
  }

  // Método para cerrar sesión (logout)
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.isAuthenticatedSubject.next(false); // Cambia el estado a "no autenticado"
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token'); // Retorna true si existe un token
  }
}
