import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocioService } from '../../socios/service/socio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../libros/service/libros.service';
import { PrestamoService } from '../service/prestamo.service';
import { Libro } from '../../libros/models/libros.models'; 
import { Socio } from '../../socios/models/socios.models';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-prestamo',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraNavegacionComponent],
  templateUrl: './nuevo-prestamo.component.html',
  styleUrls: ['./nuevo-prestamo.component.css']
})
export class NuevoPrestamoComponent implements OnInit {
  prestamoId: number = 0;
  libroNombre: string = '';
  libro: Libro | null = null;
  socioSearchQuery: string = '';
  sociosFiltrados: Socio[] = [];
  socio: Socio | null = null;
  fechaPrestamo: Date = new Date();
  fechaDevolucion: Date = new Date();
  devuelto: boolean = false;
  fechaPrestamoString: string = this.fechaPrestamo.toISOString().substring(0, 10);
  fechaDevolucionString: string = this.fechaDevolucion.toISOString().substring(0, 10);


  constructor(
    private socioService: SocioService,
    private prestamoService: PrestamoService,
    private router: Router,
    private libroService: LibroService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const libroSeleccionado = this.libroService.getLibro();
    const fechas = this.calculateDevolucion();
    if (libroSeleccionado) {
      this.libro = libroSeleccionado;
      this.libroNombre = libroSeleccionado.titulo;
    } else {
      console.error('No se seleccionó ningún libro.');
    }
  }

  calculateDevolucion(): void {
    const fechaActual = new Date();
    const fechaDevolucion = new Date();
    
    fechaDevolucion.setDate(fechaActual.getDate() + 7);
  
    this.fechaPrestamo= fechaActual;
    this.fechaDevolucion = fechaDevolucion;
    this.fechaDevolucionString = this.fechaDevolucion.toISOString().substring(0, 10);
    this.fechaPrestamoString = this.fechaPrestamo.toISOString().substring(0, 10);
  
    console.log('Fecha de devolución calculada:', this.fechaDevolucionString);
  }
  

  buscarSocios(query: string) {
    if (query.length > 2) {
      this.socioService.buscarSociosPorNombre(query).subscribe({
        next: (socios) => {
          this.sociosFiltrados = socios;
        },
        error: (err) => {
          console.error('Error al buscar socios:', err);
        }
      });
    } else {
      this.sociosFiltrados = [];
    }
  }

  selectSocio(socio: Socio) {
    this.socio = socio; 
    this.socioSearchQuery = `${socio.nombre} ${socio.apellido}`; 
    this.sociosFiltrados = []; 
  }

  crearPrestamo() {
    if (this.libro && this.socio) {

      this.libro.disponible = false;

      const nuevoPrestamo = {
        prestamoId: this.prestamoId,
        libro: this.libro,
        socio: this.socio,
        fechaPrestamo: this.fechaPrestamo,
        fechaDevolucion: this.fechaDevolucion,
        devuelto: this.devuelto
      };
  
      this.prestamoService.create(nuevoPrestamo).subscribe({
        next: (response) => {
          console.log('Préstamo creado con éxito:', response);
          
          if (this.libro?.libroId) { 
            const libroActualizado: Libro = {
              ...this.libro, 
              disponible: false 
            };
  
            this.http.patch<any>(`http://localhost:3000/libros/${this.libro.libroId}`, libroActualizado).subscribe({
              next: (updateResponse) => {
                console.log('Libro actualizado con éxito:', updateResponse);
                alert('Préstamo creado con éxito');
                this.router.navigate(['/prestamos']); 
              },
              error: (err) => {
                console.error('Error al actualizar el libro:', err);
              }
            });
          } else {
            console.error('El libro no tiene un ID válido');
          }
        },
        error: (err) => {
          console.error('Error al crear el préstamo:', err);
        }
      });
    } else {
      console.error('Libro o socio no definidos');
    }
  }


  stringifySocio(socio: any): string {
    return JSON.stringify(socio);
  }

}
