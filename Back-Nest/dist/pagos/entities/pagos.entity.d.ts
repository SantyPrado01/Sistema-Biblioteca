import { Socio } from '../../socios/entities/socio.entity';
export declare class Pago {
    pagoId: number;
    socio: Socio;
    monto: number;
    fechaFacturacion: Date;
    fechaVencimiento: Date;
    fechaPago: Date | null;
    pagado: boolean;
}
