export class Libro {
    tipo:string;
    codigo: number;
    categoria: string;
    editorial: string;
    nombre: string;
    autor: string;
    añoPublicacion: number;
    prestado: boolean;
    constructor(tipo:string,codigo: number, categoria: string, editorial: string, nombre: string, autor: string, añoPublicacion: number,prestado: boolean) {
        this.tipo = tipo;
        this.codigo = codigo;
        this.categoria = categoria;
        this.editorial = editorial;
        this.nombre = nombre;
        this.autor = autor;
        this.añoPublicacion = añoPublicacion;
        this.prestado=prestado;
    }
}
