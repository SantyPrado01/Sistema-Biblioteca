import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../libros/models/libros.models';
import { Prestamo } from '../models/prestamo.models';
import { LibroService } from '../../libros/service/libros.service';
import { HttpClient } from '@angular/common/http';
import { PrestamoService } from '../service/prestamo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-prestamos',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, FormsModule],
  templateUrl: './listar-prestamos.component.html',
  styleUrl: './listar-prestamos.component.css'
})
export class ListarPrestamosComponent {
  libroId: number = 0;
  socioId: number = 0;
  prestamo: Prestamo[] = [];
  prestamosFiltrados: Prestamo[] = [];
  librosFiltrados: Libro[] = [];
  isLoading = true;
  searchQuery: string = '';
  filtroSeleccionado: string = 'todos';

  constructor(
    private libroService: LibroService,
    private http: HttpClient,
    private router: Router,
    private prestamoService: PrestamoService
  ) {}

  ngOnInit(): void {
    this.cargarPrestamos();  // Cargamos los préstamos también
  }

  cargarPrestamos(): void {
    this.prestamoService.findAll().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamo = data;
        this.prestamosFiltrados = data; // Asegúrate de que prestamoFiltrados se inicialice
        this.isLoading = false;
        console.log('Prestamos:', this.prestamo);
      },
      error: (err) => {
        console.error('Error al cargar los préstamos', err);
        this.isLoading = false;
      }
    });
  }

  filtrarPrestamos(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'pendientes') {
      this.prestamosFiltrados = this.prestamo.filter(prestamo => !prestamo.devuelto);
    } else if (value === 'devueltos') {
      this.prestamosFiltrados = this.prestamo.filter(prestamo => prestamo.devuelto);
    } else {
      this.prestamosFiltrados = [...this.prestamo]; 
    }

    if (this.searchQuery) {
      this.prestamosFiltrados = this.prestamosFiltrados.filter(prestamo =>
        prestamo.libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        prestamo.libro.autor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        prestamo.socio.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        prestamo.socio.apellido.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  marcarDevolucion(prestamoId: number): void {
    const prestamo = this.prestamo.find(p => p.prestamoId === prestamoId);
    
    if (prestamo) {
      const confirmacion = confirm(`¿Está seguro de que desea marcar el préstamo ${prestamoId} como devuelto?`);
      
      if (confirmacion) {

        prestamo.devuelto = true; 
  
        const libroId = prestamo.libro.libroId;
  
        this.libroService.findOne(libroId).subscribe(libro => {
          if (libro) {
            libro.disponible = true;
  
            // Actualizar el libro en la base de datos
            this.http.patch<any>(`http://localhost:3000/libros/${libroId}`, libro).subscribe({
              next: () => {
                // Ahora actualizamos el préstamo
                this.http.patch<any>(`http://localhost:3000/prestamos/${prestamoId}`, prestamo).subscribe({
                  next: (response) => {
                    console.log('Préstamo actualizado con éxito:', response);
                    alert('El préstamo ha sido marcado como devuelto con éxito.'); 
                    this.cargarPrestamos(); 
                  },
                  error: (err) => {
                    console.error('Error al actualizar el préstamo:', err);
                    alert('Ocurrió un error al marcar el préstamo como devuelto.'); 
                  }
                });
              },
              error: (err) => {
                console.error('Error al actualizar el libro:', err);
                alert('Ocurrió un error al actualizar la disponibilidad del libro.'); 
              }
            });
          }
        });
      } else {
        console.log('Actualización cancelada por el usuario.');
      }
    } else {
      console.error('Préstamo no encontrado');
      alert('Préstamo no encontrado.'); 
    }
  }
  

}
