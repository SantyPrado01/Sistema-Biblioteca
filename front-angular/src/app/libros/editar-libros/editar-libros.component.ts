import { Component } from '@angular/core';
import { LibroService } from '../service/libros.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editar-libros',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './editar-libros.component.html',
  styleUrl: './editar-libros.component.css'
})
export class EditarLibrosComponent {
  libroId: number = 0;
  titulo: string = '';
  autor: string = '';
  categoria: string = '';
  eliminado: boolean = false;
  disponible: boolean = true;
  mensajeExito: string = '';

  constructor(private libroService: LibroService, private router: Router, private http: HttpClient, private route:ActivatedRoute) {}

  libro: any = {};

  ngOnInit(){
    const libroId = this.route.snapshot.paramMap.get('id');
    if (libroId){
      this.cargarLibro(libroId)
    }

  }

  cargarLibro(libroId:string):void{
    this.http.get<any>(`http://localhost:3000/libros/${libroId}`).subscribe({
      next:(data) =>{
        this.libro = data;
        this.libroId = data.libroId
        this.titulo = data.titulo;
        this.autor = data.autor;
        this.categoria = data.categoria;
        console.log('Datos del libro: ', data)
      },
      error:(err) => {
        console.error('Error al cargar los datos del libro.', err)
      }
    })
  }

  actualizarLibro() {
    const libroId = this.route.snapshot.paramMap.get('id');
    console.log('ACA ');
    if(libroId){
      const libroActualizado = {
      libroId: this.libroId,
      titulo: this.titulo,
      autor: this.autor,
      categoria: this.categoria,
      eliminado: this.eliminado,
      disponible: this.disponible
    };
    this.http.patch<any>(`http://localhost:3000/libros/${libroId}`, libroActualizado).subscribe({
      next: (response) => {
        console.log('Libro Actualizado con exito: ', response);
        this.mensajeExito = 'Libro Actualizado con Exito.';
        setTimeout(() => {
          this.router.navigate(['libros/listar']);
        },2000);
      },
      error: (err) =>{
        console.error('Error al actualizar el libro', err)
      }
    });
  }   
}

cancelar() {
  alert('Libro NO actualizado, operación cancelada.');
  this.router.navigate(['/libros/listar']);
}

}
