export class Usuario{

    usuarioId:number;
    nombreUsuario: string;
    contrasena: string;
    rol: string;
    eliminado: boolean;

    constructor(nombreUsuario: string, contrasena: string, rol: string, eliminado: boolean, usuarioId:number){
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.rol = rol;
        this.eliminado = eliminado;
    }

}