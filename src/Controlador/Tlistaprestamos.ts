import { Prestamo } from '../Entidades/prestamos';

export class TlistaPrestamos {

    prestamos: Prestamo[];
    listaprestamosaux: Prestamo[];

    constructor() {
        const store =localStorage.getItem('prestamos');
        this.listaprestamosaux = store ? JSON.parse(store): [];
        this.prestamos = [];
    }

   
    // Métodos para Estudiantes
    insertarPrestamo(Prestamo: Prestamo) {
        this.listaprestamosaux.push(Prestamo);
        this.guardarlocalstorage();
    }

    modificarPrestamo(pos: number, op: Prestamo) {
        this.listaprestamosaux[pos] = op;
        this.guardarlocalstorage();
    }

    eliminarPrestamo(pos: number) {
        this.listaprestamosaux.splice(pos, 1);
        this.guardarlocalstorage();
    }
    Listar(){
        for(let i=0; i<this.prestamos.length;i++){
            console.table(this.prestamos[i]);
        }
    }
    private guardarlocalstorage (){
        localStorage.setItem('prestamos',JSON.stringify(this.listaprestamosaux));
    }
    private predefinidos(){
        this.listaprestamosaux.push(new Prestamo("0750253478","1","2002-05-06","2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("0987654321", "1", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("1234567890", "1", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("5678901234", "2", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("9876543210", "2", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("5432109876", "4", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("1357924680", "5", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("2468013579", "6", "2002-05-06", "2002-05-06"));
        this.listaprestamosaux.push(new Prestamo("1111111111", "8", "2002-05-06", "2002-05-06"));
    }
}