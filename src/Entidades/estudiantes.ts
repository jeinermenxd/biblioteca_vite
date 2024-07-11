import { Libro } from "./libro";

export class Estudiante {
    idestudiante : number ;
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: string;
    status:boolean;
    librosPrestados: Libro[];
    constructor(idestudiante:number,cedula: string, nombre: string, apellido: string, sexo: string, fechaNacimiento: string, status:boolean) {
        this.idestudiante = idestudiante;
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.status = status;
        this.librosPrestados = [];
    }
}
