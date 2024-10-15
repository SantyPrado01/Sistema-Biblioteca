import { Prestamo } from '../../prestamos/entities/prestamo.entity';
export declare class Libro {
    libroId: number;
    titulo: string;
    autor: string;
    categoria: string;
    disponible: boolean;
    prestamos: Prestamo[];
    eliminado: boolean;
}
