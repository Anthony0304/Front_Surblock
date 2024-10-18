import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';
import { Router } from '@angular/router';  // Importa el Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  // Propiedades para mostrar/ocultar las contraseñas
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private dialog: MatDialog, 
    private router: Router  // Inyecta el Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  // Métodos para alternar la visibilidad de las contraseñas
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.register(formData).subscribe(
        (response) => {
          this.openModal('Registro exitoso', 'El usuario se ha registrado correctamente.', true);
        },
        (error) => {
          this.openModal('Error en el registro', 'Hubo un problema al registrar el usuario.', false);
        }
      );
    }
  }

  openModal(title: string, message: string, shouldResetForm: boolean): void {
    const dialogRef = this.dialog.open(ModalNotificationComponent, {
      width: '300px',
      data: { title, message }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (shouldResetForm) {
        this.registerForm.reset();  // Limpiar el formulario
        this.router.navigate(['/login']);  // Redirigir al login
      }
    });
  }
}
