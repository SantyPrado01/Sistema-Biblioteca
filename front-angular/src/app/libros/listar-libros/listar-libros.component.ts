import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../models/libros.models';
import { LibroService } from '../service/libros.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Prestamo } from '../../prestamos/models/prestamo.models';
import { PrestamoService } from '../../prestamos/service/prestamo.service';

@Component({
  selector: 'app-listar-libros',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, FormsModule],
  templateUrl: './listar-libros.component.html',
  styleUrl: './listar-libros.component.css'
})
export class ListarLibrosComponent {
  libro: Libro[] = [];
  prestamo: Prestamo[] = [];
  librosFiltrados: Libro[] = [];
  isLoading = true;
  searchQuery: string = '';

  constructor(
    private libroService: LibroService,
    private http: HttpClient,
    private router: Router,
    private prestamoService: PrestamoService
  ) {}

  prestamoNuevo(selectedLibro: Libro) {
    this.libroService.setLibro(selectedLibro); // Almacenar el libro en el servicio
    this.router.navigate(['/prestamo/nuevo']);
  }
  ngOnInit(): void {
    this.cargarLibros();
    this.cargarPrestamos();  // Cargamos los préstamos también
  }

  cargarLibros(): void {
    this.libroService.findAll().subscribe({
      next: (data: Libro[]) => {
        this.libro = data;
        this.librosFiltrados = data; // Inicialmente mostramos todos los libros
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los libros', err);
        this.isLoading = false;
      }
    });
  }

  cargarPrestamos(): void {
    this.prestamoService.findAll().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los préstamos', err);
        this.isLoading = false;
      }
    });
  }

  obtenerFechaDevolucion(libroId: number): Date | null {
    const prestamo = this.prestamo.find(p => p.libro.libroId === libroId && !p.devuelto);
    return prestamo ? prestamo.fechaDevolucion : null;
}
 
  filtrarLibros(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'activos') {
      this.librosFiltrados = this.libro.filter(libro => !libro.eliminado && libro.disponible);
    } else {
      this.librosFiltrados = this.libro; // Muestra todos los libros
    }
  }

  buscarLibros(): void {
    this.librosFiltrados = this.libro.filter(libro => 
      libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      libro.autor.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  eliminarLibro(libro: Libro) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      const libroId = libro.libroId;

      this.http.patch<Libro>(`http://localhost:3000/libros/${libroId}`, { eliminado: true }).subscribe({
        next: (response) => {
          console.log('Libro eliminado con éxito:', response);
          alert('Libro eliminado con éxito');
          this.cargarLibros(); // Recarga la lista de libros después de eliminar uno
        },
        error: (err) => {
          console.log('ID del libro:', libroId);
          console.error('Error al eliminar el libro:', err);
        }
      });
    } else {
      console.log('Operación cancelada');
    }
  }
}
