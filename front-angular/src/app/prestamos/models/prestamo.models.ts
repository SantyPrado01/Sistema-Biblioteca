import { Libro } from "../../libros/models/libros.models";
import { Socio } from "../../socios/models/socios.models";

export class Prestamo{

    prestamoId: number;
    libro: Libro;
    socio: Socio;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    devuelto: boolean;

    constructor(prestamoId: number, libro: Libro, socio: Socio, fechaPrestamo: Date, fechaDevolucion: Date, devuelto: boolean){
        this.prestamoId = prestamoId;
        this.libro = libro;
        this.socio = socio;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.devuelto = devuelto;
    }

}