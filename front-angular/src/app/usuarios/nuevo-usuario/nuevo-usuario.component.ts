import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service'; // Asegúrate de que el servicio esté correctamente importado
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  rol: string = '';
  eliminado: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  crearUsuario(): void {
    const nuevoUsuario = {
      nombreUsuario: this.nombreUsuario,
      contrasena: this.contrasena,
      rol: this.rol,
      eliminado: this.eliminado,
    };

    this.loginService.register(nuevoUsuario).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al guardar el empleado:', err);
      }
    });
  }
}
