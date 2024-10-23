import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { SocioService } from '../service/socio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-socio',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraNavegacionComponent],
  templateUrl: './nuevo-socio.component.html',
  styleUrls: ['./nuevo-socio.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class NuevoSocioComponent {
  socioId: number = 0;
  nroDocumento: string = '';
  apellido: string = '';
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  eliminado: boolean = false;
  mensajeExito: string = ''; // Variable para el mensaje de éxito

  constructor(private socioService: SocioService, private router: Router) {}

  crearSocio(): void {
    const nuevoSocio = {
      socioId: this.socioId,
      nroDocumento: this.nroDocumento,
      apellido: this.apellido,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      eliminado: this.eliminado,
    };
    
    this.socioService.create(nuevoSocio).subscribe({
      next: () => {
        this.mensajeExito = 'Socio creado con éxito'; // Mensaje de éxito
        this.limpiarCampos(); // Llama a la función para limpiar los campos
        // Redireccionar a la lista de socios después de un pequeño delay
        setTimeout(() => {
          this.router.navigate(['/socios/listar']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (err) => {
        console.error('Error al guardar el socio: ', err);
      }
    });
  }

  limpiarCampos(): void {
    this.nroDocumento = '';
    this.apellido = '';
    this.nombre = '';
    this.email = '';
    this.telefono = '';
  }
}
