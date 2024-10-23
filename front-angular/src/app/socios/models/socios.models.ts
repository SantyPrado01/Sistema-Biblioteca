export class Socio{

    socioId: number;
    nroDocumento: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono:string;
    eliminado:boolean;

    constructor(nroDocumento: string, nombre: string, apellido: string, email: string, telefono: string, eliminado: boolean, socioId:number){
        this.nroDocumento = nroDocumento
        this.socioId = socioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.eliminado = eliminado;
    }

}