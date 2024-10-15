import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NuevoLibrosComponent } from './libros/nuevo-libros/nuevo-libros.component';
import { ListarLibrosComponent } from './libros/listar-libros/listar-libros.component';
import { NuevoSocioComponent } from './socios/nuevo-socio/nuevo-socio.component';
import { ListarSocioComponent } from './socios/listar-socio/listar-socio.component';
import { NuevoPrestamoComponent } from './prestamos/nuevo-prestamo/nuevo-prestamo.component';
import { InicioAdminComponent } from './inicio/inicio-admin/inicio-admin.component';
import { InicioDefectoComponent } from './inicio/inicio-defecto/inicio-defecto.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'inicio', component: InicioAdminComponent },
    { path: 'inicioAdmin', component: InicioDefectoComponent },
    { path: 'libros/nuevo', component: NuevoLibrosComponent },
    { path: 'libros/listar', component: ListarLibrosComponent },
    { path: 'socios/nuevo', component: NuevoSocioComponent },
    { path: 'socios/listar', component: ListarSocioComponent },
    { path: 'prestamos', component: NuevoPrestamoComponent },
];