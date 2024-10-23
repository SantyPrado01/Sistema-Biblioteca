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
import { EditarSocioComponent } from './socios/editar-socio/editar-socio.component';
import { ListarPrestamosComponent } from './prestamos/listar-prestamos/listar-prestamos.component';
import { AuthGuard } from './login/auth/auth.guard'; 
import { EditarLibrosComponent } from './libros/editar-libros/editar-libros.component';

export const routes: Routes = [
    { path: '', component: LoginComponent,},
    { 
        path: 'inicio', 
        component: InicioDefectoComponent, 

    },
    { 
        path: 'usuario/nuevo', 
        component: NuevoUsuarioComponent, 
        canActivate:[AuthGuard],
        data: { expectedRole: 'Administrador' }
    },
    { 
        path: 'usuario/listar', 
        component: ListarUsuarioComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: 'Administrador' } 
    },
    { 
        path: 'usuario/editar/:id', 
        component: EditarUsuarioComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ] }

     },
    { 
        path: 'libros/nuevo', 
        component: NuevoLibrosComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]}
     },
    { 
        path: 'libros/listar', 
        component: ListarLibrosComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]} 
    },
    { 
        path: 'libros/editar/:id', 
        component: EditarLibrosComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]} 
    },
    { 
        path: 'socios/nuevo', 
        component: NuevoSocioComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: 'Administrador' }
    },
    { 
        path: 'socios/listar', 
        component: ListarSocioComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]}
    },
    { 
        path: 'socios/editar/:id', 
        component: EditarSocioComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]}
     },
    { 
        path: 'prestamo/nuevo', 
        component: NuevoPrestamoComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]}
     },
    { 
        path: 'prestamo/listar', 
        component: ListarPrestamosComponent,
        canActivate:[AuthGuard],
        data: { expectedRole: ['Administrador', 'Adminstrativo' ]}
     },
];
