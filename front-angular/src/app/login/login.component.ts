import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router){}

  inicioSesion(): void {
    this.authService.login(this.nombreUsuario, this.contrasena).subscribe({
      next: (response)=> {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if(role === 'Administrador') {
          this.router.navigate(['/inicioAdmin'])
        }else {
          this.router.navigate(['/inicio'])
        }
      },
      error: (err) => console.error('Login Error', err)
    })
  }

}
