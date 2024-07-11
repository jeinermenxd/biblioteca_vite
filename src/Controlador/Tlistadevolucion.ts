import { Devoluciones } from "../Entidades/devolucion";
import { Prestamo } from "../Entidades/prestamos";

export class TlistaDevoluciones {
    devolucion: Devoluciones[];
    ListDevolucion: Devoluciones[];

    constructor() {
        const storedData = localStorage.getItem('listaDevoluciones');
        this.ListDevolucion = storedData ? JSON.parse(storedData) : [];
        
        this.devolucion = [];
    }

    Insertar(op: Devoluciones) {
        this.ListDevolucion.push(op);
        this.guardarEnLocalStorage();
    }
    Modificar(pos: number, op: Devoluciones) {
        this.ListDevolucion[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {      
        this.ListDevolucion.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
        this.ListDevolucion.forEach(a => {
            return a;
        })
    }

    private guardarEnLocalStorage() {
        localStorage.setItem('listaDevoluciones', JSON.stringify(this.ListDevolucion));
    }

    private agregarDatosPredefinidos() {
        this.ListDevolucion = [
            {
                cedula:"0750253478",
                codigo:"1",
                fechaprestamo:"2002-10-15",
                fechafin:"2002-10-15",
            }
        ];
    }

}