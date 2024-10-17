export class Socio{

    socioId: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono:string;
    eliminado:boolean;

    constructor(nombre: string, apellido: string, email: string, telefono: string, eliminado: boolean, socioId:number){
        this.socioId = socioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.eliminado = eliminado;
    }

}