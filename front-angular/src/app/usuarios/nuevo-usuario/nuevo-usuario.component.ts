import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de que el servicio esté correctamente importado
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraNavegacionComponent],
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  rol: string = '';
  eliminado: boolean = false;
  mensajeExito: string = '';  // Variable para mensaje de éxito
  mensajeError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  crearUsuario(): void {
    if (this.nombreUsuario && this.contrasena && this.rol) {
      const nuevoUsuario = {
        nombreUsuario: this.nombreUsuario,
        contrasena: this.contrasena,
        rol: this.rol,
        eliminado: this.eliminado,
      };

      this.loginService.register(nuevoUsuario).subscribe({
        next: () => {
          this.mensajeExito = 'Usuario Creado Con Éxito'; 
          this.mensajeError = '';  
          this.limpiarCampos()
          setTimeout(() => {
            this.router.navigate(['/usuario/listar']); 
          }, 2000);
        },
        error: (err) => {
          this.mensajeError = 'Error al crear el usuario';  
          console.error('Error al guardar el empleado:', err);
        }
      });
    } else {
      this.mensajeError = 'Por favor complete todos los campos.'; 
    }
  }

  limpiarCampos(): void {
    this.nombreUsuario = '';
    this.contrasena = '';
    this.rol = '';
    this.eliminado = false;
  }


  camposValidos(): boolean {
    return this.nombreUsuario.trim() !== '' &&
           this.contrasena.trim() !== '' &&
           this.rol.trim() !== '';
  }
}
