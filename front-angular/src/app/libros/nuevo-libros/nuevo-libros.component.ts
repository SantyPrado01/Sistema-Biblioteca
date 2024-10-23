import { Component } from '@angular/core';
import { LibroService } from '../service/libros.service';
import { Router, RouterModule } from '@angular/router';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-libros',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './nuevo-libros.component.html',
  styleUrl: './nuevo-libros.component.css'
})
export class NuevoLibrosComponent {
  libroId: number = 0;
  titulo: string = '';
  autor: string = '';
  categoria: string = '';
  eliminado: boolean = false;
  disponible: boolean = true;
  mensajeExito: string = '';

  constructor(private libroService: LibroService, private router: Router) {}

  crearLibro(): void {
    const nuevoLibro = {
      libroId: this.libroId,
      titulo: this.titulo,
      autor: this.autor,
      categoria: this.categoria,
      eliminado: this.eliminado,
      disponible: this.disponible
    };

    this.libroService.create(nuevoLibro).subscribe({
      next: () => {
        this.mensajeExito = 'Libro creado con éxito';
        this.limpiarCampos();
        setTimeout(() => {
          this.router.navigate(['/libros/listar']);
        },2000)
        
      },
      error: (err) => {
        console.error('Error al guardar el libro:', err);
      }
    });
  }
  limpiarCampos(): void {
    this.titulo = '';
    this.autor = '';
    this.categoria = '';
  }

}
