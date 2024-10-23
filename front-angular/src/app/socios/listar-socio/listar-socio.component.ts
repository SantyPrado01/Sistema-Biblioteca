import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Socio } from '../models/socios.models';
import { SocioService } from '../service/socio.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-socio',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-socio.component.html',
  styleUrl: './listar-socio.component.css'
})
export class ListarSocioComponent {
  socio: Socio[] = [];
  sociosFiltrados: Socio[] = [];
  isLoading = true;
  searchQuery: string = '';

  constructor(private socioService: SocioService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarSocios();
  }

  cargarSocios(): void {
    this.socioService.findAll().subscribe({
      next: (data: Socio[]) => {
        this.socio = data;
        this.sociosFiltrados = data; // Inicialmente mostramos todos los usuarios
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los usuarios', err);
        this.isLoading = false;
      }
    });
  }

  filtrarSocios(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'activos') {
      this.sociosFiltrados = this.socio.filter(socio => !socio.eliminado);
    } else {
      this.sociosFiltrados = this.socio; // Muestra todos los usuarios
    }
    if (this.searchQuery) {
      this.sociosFiltrados = this.sociosFiltrados.filter(socio =>
        socio.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        socio.apellido.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  eliminarSocio(socio: Socio) {
    if (confirm('¿Estás seguro de que deseas eliminar este socio?')) {
      const socioId = socio.socioId;

      this.http.patch<Socio>(`http://localhost:3000/socios/${socioId}`, { eliminado: true }).subscribe({
        next: (response) => {
          console.log('Socio eliminado con éxito:', response);
          alert('Socio eliminado con éxito');
          this.cargarSocios(); // Recarga la lista de usuarios después de eliminar uno
        },
        error: (err) => {
          console.log('ID del Socio:', socioId);
          console.error('Error al eliminar el Socio:', err);
        }
      });
    } else {
      console.log('Operación cancelada');
    }
  }

}
