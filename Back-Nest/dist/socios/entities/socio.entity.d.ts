import { Prestamo } from '../../prestamos/entities/prestamo.entity';
import { Pago } from 'src/pagos/entities/pagos.entity';
export declare class Socio {
    socioId: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    prestamos: Prestamo[];
    eliminado: boolean;
    pagos: Pago[];
}
