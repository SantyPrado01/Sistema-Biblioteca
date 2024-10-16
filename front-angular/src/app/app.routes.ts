import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NuevoLibrosComponent } from './libros/nuevo-libros/nuevo-libros.component';
import { ListarLibrosComponent } from './libros/listar-libros/listar-libros.component';
import { NuevoSocioComponent } from './socios/nuevo-socio/nuevo-socio.component';
import { ListarSocioComponent } from './socios/listar-socio/listar-socio.component';
import { NuevoPrestamoComponent } from './prestamos/nuevo-prestamo/nuevo-prestamo.component';
import { InicioDefectoComponent } from './inicio/inicio-defecto/inicio-defecto.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';
import { ListarUsuarioComponent } from './usuarios/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'inicio', component: InicioDefectoComponent },
    { path: 'usuario/nuevo', component: NuevoUsuarioComponent },
    { path: 'usuario/listar', component: ListarUsuarioComponent },
    { path: 'usuario/editar', component: EditarUsuarioComponent },
    { path: 'libros/nuevo', component: NuevoLibrosComponent },
    { path: 'libros/listar', component: ListarLibrosComponent },
    { path: 'socios/nuevo', component: NuevoSocioComponent },
    { path: 'socios/listar', component: ListarSocioComponent },
    { path: 'prestamos', component: NuevoPrestamoComponent },
];
