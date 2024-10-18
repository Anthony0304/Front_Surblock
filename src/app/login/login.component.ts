import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog'; 
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = ''; 
  password = ''; 
  errorMessage = ''; 
  showPassword = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  // Verificar si debe mostrarse el modal de éxito solo una vez tras el login
  ngOnInit() {
    this.checkLoginSuccessModal();
  }

  // Enviar el formulario de login
  onSubmit() {
    const credentials = { email: this.email, password: this.password };
  
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('auth_token', response.token); // Guardar token en localStorage
        sessionStorage.setItem('justLoggedIn', 'true'); // Flag de sesión exitosa
        this.router.navigate(['/']).then(() => {
          this.checkLoginSuccessModal(); // Asegúrate de que el modal solo se abra después de la redirección
        }); 
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error en el inicio de sesión:', error);
        this.openLoginFailedModal(); // Mostrar modal de error
      },
    });
  }
  
  // Verifica si se debe abrir el modal de éxito tras el login
  private checkLoginSuccessModal() {
    const authToken = localStorage.getItem('auth_token');
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    
    // Verificar si existe un token válido antes de mostrar el modal
    if (authToken && justLoggedIn === 'true') {
      this.openLoginSuccessModal();
      sessionStorage.removeItem('justLoggedIn'); // Eliminar flag después de mostrar el modal
    }
  }
  

  // Abrir modal de éxito tras login
  private openLoginSuccessModal() {
    this.dialog.open(ModalNotificationComponent, {
      data: {
        title: 'Éxito',
        message: 'Inicio de sesión exitoso.',
      },
    });
  }

  // Abrir modal de error en caso de fallar el login
  private openLoginFailedModal() {
    this.dialog.open(ModalNotificationComponent, {
      data: {
        title: 'Error',
        message: 'Inicio de sesión fallido. Verifique sus credenciales.',
      },
    });
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
