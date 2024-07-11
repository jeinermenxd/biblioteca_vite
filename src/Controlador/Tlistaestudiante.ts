import { Estudiante } from '../Entidades/estudiantes';

export class TlistaEstudiante {

    estudiantes: Estudiante[];
    listaestudianteaux: Estudiante[];

    constructor() {
        const store =localStorage.getItem('estudiantes');
        this.listaestudianteaux = store ? JSON.parse(store): [];
        if(!store){
            this.predefinidos();
        }
        this.estudiantes = [];
    }

   
    // Métodos para Estudiantes
    insertarEstudiante(Estudiante: Estudiante) {
        this.listaestudianteaux.push(Estudiante);
        this.guardarlocalstorage();
    }

    modificarEstudiante(idestudiante: number, nuevoestudiante: Estudiante) {
        const index = this.listaestudianteaux.findIndex(estudiante => estudiante.idestudiante === idestudiante);
        if (index !== -1) {
            this.listaestudianteaux[index] = nuevoestudiante;
            this.guardarlocalstorage();
            console.log("hola")
        } else {
            console.log("Libro no encontrado");
        }
    }
    Modificar(pos: number, op: Estudiante) {
        this.listaestudianteaux[pos] = op;
        this.guardarlocalstorage();
    }

    eliminarEstudiante(cedula: string) {
        this.listaestudianteaux = this.listaestudianteaux.filter(Estudiante => Estudiante.cedula !== cedula);
        this.guardarlocalstorage();
    }
    Listar(){
        for(let i=0; i<this.estudiantes.length;i++){
            console.table(this.estudiantes[i]);
        }
    }
    private guardarlocalstorage (){
        localStorage.setItem('estudiantes',JSON.stringify(this.listaestudianteaux));
    }
    private predefinidos(){
        this.listaestudianteaux.push(new Estudiante(1,"0750253478","Jeiner","Mendieta","Masculino","2002-05-06",true));
        this.listaestudianteaux.push(new Estudiante(2,"0987654321", "María", "Gómez", "Femenino", "2001-05-06",true));
        this.listaestudianteaux.push(new Estudiante(3,"1234567890", "Juan", "Pérez", "Masculino", "2003-05-06",true));
        this.listaestudianteaux.push(new Estudiante(4,"5678901234", "Ana", "López", "Femenino", "2001-05-06",true));
        this.listaestudianteaux.push(new Estudiante(5,"9876543210", "Pedro", "Ramírez", "Masculino", "2002-05-06",true));
        this.listaestudianteaux.push(new Estudiante(6,"5432109876", "Luisa", "Martínez", "Femenino", "2011-05-06",true));
        this.listaestudianteaux.push(new Estudiante(7,"1357924680", "Diego", "Hernández", "Masculino", "2001-05-06",true));
        this.listaestudianteaux.push(new Estudiante(8,"2468013579", "Laura", "Díaz", "Femenino", "2002-05-06",true));
        this.listaestudianteaux.push(new Estudiante(9,"1111111111", "Pepe", "García", "Masculino", "2010-05-06",true));
    }
    
}