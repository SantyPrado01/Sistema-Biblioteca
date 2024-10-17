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
  styleUrl: './nuevo-socio.component.css'
})
export class NuevoSocioComponent {
  socioId: number = 0;
  apellido: string = '';
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  eliminado: boolean = false;

  constructor(private socioService: SocioService, private router: Router){}

  crearSocio(): void{
    const nuevoSocio = {
      socioId: this.socioId,
      apellido: this.apellido,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      eliminado: this.eliminado,
    };
    
    this.socioService.create(nuevoSocio).subscribe({
      next:() =>{
        this.router.navigate(['/socios']);
      },
      error: (err) =>{
        console.error('Error al guardar el socio: ', err)
      }
    })
  }

}
