import { Socio } from "./socios.models";

export class Pago{

    pagoId: number;
    socio: Socio;
    monto: number;
    fechaFacturacion: Date;
    fechaVencimiento: Date;
    fechaPago: Date;
    pagado:boolean;

    constructor(pagoId: number, socio: Socio, monto: number, fechaFacturacion: Date, fechaVencimiento: Date, fechaPago: Date, pagado: boolean){
        this.pagoId = pagoId;
        this.socio = socio;
        this.monto = monto;
        this.fechaFacturacion = fechaFacturacion;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaPago = fechaPago;
        this.pagado = pagado;
    }

}