import { Socio } from 'src/socios/entities/socio.entity';
export declare class Pago {
    pagoId: number;
    socio: Socio;
    monto: number;
    fechaFacturacion: Date;
    fechaVencimiento: Date;
    fechaPago: Date | null;
    pagado: boolean;
}
