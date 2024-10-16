import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { LoginService } from '../../login/service/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {
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
