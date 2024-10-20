export class Libro{

    libroId: number;
    titulo: string;
    autor: string;
    categoria: string;
    eliminado: boolean;
    disponible: boolean;

    constructor(libroId: number, titulo: string, autor: string, categoria: string, eliminado: boolean, disponible: boolean){
        this.libroId = libroId;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.eliminado = eliminado;
        this.disponible = disponible;
    }

}