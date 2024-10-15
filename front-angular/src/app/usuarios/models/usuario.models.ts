export class Usuario{

    nombreUsuario: string;
    contrasena: string;
    rol: string;

    constructor(nombreUsuario: string, contrasena: string, rol: string){
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.rol = rol
    }

}