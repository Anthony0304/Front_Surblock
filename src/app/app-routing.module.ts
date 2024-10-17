import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Importa tu LoginComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: ' ', pathMatch: 'full' }, // Redirige a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
