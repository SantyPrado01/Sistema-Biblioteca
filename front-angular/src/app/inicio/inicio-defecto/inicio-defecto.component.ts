import { Component, OnInit } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { Pago } from '../../socios/models/pago.models';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../prestamos/service/prestamo.service';
import { Prestamo } from '../../prestamos/models/prestamo.models';
import { LibroService } from '../../libros/service/libros.service';
import { AuthService } from '../../login/auth/auth.service';

@Component({
  selector: 'app-inicio-defecto',
  standalone: true,
  imports: [BarraNavegacionComponent, RouterModule, CommonModule],
  templateUrl: './inicio-defecto.component.html',
  styleUrl: './inicio-defecto.component.css'
})
export class InicioDefectoComponent implements OnInit {

  pago: Pago [] = [];
  prestamo: Prestamo[] = [];

  isLoading = true;
  username: string | null = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private prestamoService: PrestamoService,
    private libroService: LibroService,
    private authService: AuthService

  ) {}

  ngOnInit(): void{
    this.cargarPagos();
    this.cargarPrestamos();
    this.username = this.authService.getUsername();
  }

  cargarPagos(): void {
    this.http.get<any>(`http://localhost:3000/pagos`).subscribe({
      next: (data: Pago[]) => {
        this.pago = data.filter(data => !data.pagado);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los pagos', err);
        this.isLoading = false;
      }
    });
  }

  cargarPrestamos(): void {
    this.prestamoService.findAll().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamo = data.filter(data => !data.devuelto);
        console.log(this.prestamo)   
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los préstamos', err);
        this.isLoading = false;
      }
    });
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

  pagarCuota(pagoId: number): void{
    this.http.patch(`http://localhost:3000/pagos/${pagoId}`, {pagado: true}).subscribe({
      next: (response) => {
        alert('Pago realizado con éxito');
        console.log('Pago realizado con éxito', response);
        this.ngOnInit()
      },
      error: (err) => {
        console.error('Error al procesar el pago', err);
      }
    });
  }
  
}
