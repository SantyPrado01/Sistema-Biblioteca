import { Libro } from '../../libros/entities/libro.entity';
import { Socio } from '../../socios/entities/socio.entity';
export declare class Prestamo {
    prestamoId: number;
    libro: Libro;
    socio: Socio;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    devuelto: boolean;
}
