import { Prestamo } from '../../prestamos/entities/prestamo.entity';
import { Pago } from '../../pagos/entities/pagos.entity';
export declare class Socio {
    socioId: number;
    nroDocumento: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    prestamos: Prestamo[];
    eliminado: boolean;
    pagos: Pago[];
}
