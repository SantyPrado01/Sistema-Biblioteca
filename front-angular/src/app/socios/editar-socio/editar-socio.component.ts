import { Component } from '@angular/core';
import { SocioService } from '../service/socio.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pago } from '../models/pago.models';
import { Usuario } from '../../usuarios/models/usuario.models';


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
  isLoading = true;

  pago: Pago[] = [];
  pagosFiltrados: Pago[] = [];

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
      this.cargarPagos(socioId)
    }
  }

  cargarPagos(socioId: string): void {
    this.http.get<any>(`http://localhost:3000/pagos/socio/${socioId}`).subscribe({
      next: (data: Pago[]) => {
        this.pago = data;
        console.log('Pagos cargados:', this.pago); // Verifica los datos de los pagos
        this.cargarPagosFiltrados(socioId);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los pagos', err);
        this.isLoading = false;
      }
    });
  }
  
  cargarPagosFiltrados(id: string): void {
    console.log('Filtrando pagos...'); // Añadir un mensaje para verificar
    this.pagosFiltrados = this.pago.filter(pago => {
      console.log('Pago actual:', pago); // Ver cada pago al filtrar
      // Convertir ambos IDs a string antes de compararlos
      return !pago.pagado && String(pago.socio.socioId) === String(id);
    });
    console.log('Pagos filtrados:', this.pagosFiltrados); // Verifica los pagos filtrados
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

  pagarCuota(pagoId: number): void{
    this.http.patch(`http://localhost:3000/pagos/${pagoId}`, {}).subscribe({
      next: (response) => {
        console.log('Pago realizado con éxito', response);
        
      },
      error: (err) => {
        console.error('Error al procesar el pago', err);
      }
    });
  }

  cancelar() {
    alert('Socio NO actualizado, operación cancelada.');
    this.router.navigate(['/socios/listar']);
  }
}
