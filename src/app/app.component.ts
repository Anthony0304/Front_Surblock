import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNotificationComponent } from './modal-notification/modal-notification.component'; // Asegúrate de importar tu modal

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
    private dialog: MatDialog // Inyectar MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.openLoginSuccessModal(); // Mostrar el modal
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openLoginSuccessModal() {
    this.dialog.open(ModalNotificationComponent, {
      data: {
        title: 'Éxito',
        message: 'Inicio de sesión exitoso'
      }
    });
  }

  openLoginFailedModal() {
    this.dialog.open(ModalNotificationComponent, {
      data: {
        title: 'Error',
        message: 'Inicio de sesión fallido. Verifique sus credenciales.'
      }
    });
  }
}
