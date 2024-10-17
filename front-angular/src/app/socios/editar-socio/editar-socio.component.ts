import { Component } from '@angular/core';
import { SocioService } from '../service/socio.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-editar-socio',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './editar-socio.component.html',
  styleUrl: './editar-socio.component.css'
})
export class EditarSocioComponent {

  socioId: number = 0;
  apellido: string = '';
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  eliminado: boolean = false;

  constructor(
    private socioService: SocioService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {}

  socio: any = {};

  ngOnInit() {
    const socioId = this.route.snapshot.paramMap.get('id');
    if (socioId) {
      this.cargarSocio(socioId);
    }
  }

  cargarSocio(socioId: string): void {
    this.http.get<any>(`http://localhost:3000/socios/${socioId}`).subscribe({
      next: (data) => {
        this.socio = data;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.email = data.email;
        this.telefono = data.telefono;
        console.log('Datos del Socio cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar los datos del Socio', err);
      }
    });
  }

  actualizarSocio() {
    const socioId = this.route.snapshot.paramMap.get('id');
    if (socioId) {
      const socioActualizado = {
        apellido: this.apellido,
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono
      };

      this.http.patch<any>(`http://localhost:3000/socios/${socioId}`, socioActualizado).subscribe({
        next: (response) => {
          console.log('Socio actualizado con éxito:', response);
          alert('Socio actualizado con éxito');
          this.router.navigate(['/socios/listar']);
        },
        error: (err) => {
          console.error('Error al actualizar el Socio:', err);
        }
      });
    }
  }

  cancelar() {
    alert('Socio NO actualizado, operación cancelada.');
    this.router.navigate(['/socios/listar']);
  }
}
