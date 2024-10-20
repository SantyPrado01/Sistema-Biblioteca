import { Libro } from "src/libros/entities/libro.entity";
import { Socio } from "src/socios/entities/socio.entity";
export declare class CreatePrestamoDto {
    libro: Libro;
    socio: Socio;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    devuelto: boolean;
}
