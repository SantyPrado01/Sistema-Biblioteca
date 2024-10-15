import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router){}

  inicioSesion(): void {
    this.authService.login(this.username, this.password).subscribe({
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
