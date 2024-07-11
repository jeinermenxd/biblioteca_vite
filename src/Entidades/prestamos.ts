
export class Prestamo {
    numeroCedula: string;
    codigoLibro: string;
    fechaPrestamo: string;
    fechaEntrega: string;

    constructor(numeroCedula: string, codigoLibro: string, fechaPrestamo: string, fechaEntrega: string) {
        this.numeroCedula = numeroCedula;
        this.codigoLibro = codigoLibro;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaEntrega = fechaEntrega;
    }

}