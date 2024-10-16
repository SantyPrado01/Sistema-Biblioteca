import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarraNavegacionComponent } from '../../barra-navegacion/barra-navegacion.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [BarraNavegacionComponent, CommonModule, RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('/api/users').subscribe(data => {
      this.users = data;
    });
  }

  editUser(id: number) {
    console.log('Edit user', id);
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.http.delete(`/api/users/${id}`).subscribe(() => {
        this.loadUsers(); // Recarga la lista de usuarios tras la eliminación
      });
    }
  }

}
