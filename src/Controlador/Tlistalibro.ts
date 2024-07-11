import { Libro } from '../Entidades/libro';

export class Tlistalibro {
    libros: Libro[];
    listalibros : Libro[];

    constructor() {
        const store =localStorage.getItem('libro');
        this.listalibros = store ? JSON.parse(store): [];
        if(!store){
            this.predefinidos();
        }
        this.libros = [];
    }
    

    // Métodos para libros
    insertarLibro(libro: Libro) {
        this.listalibros.push(libro);
        this.guardarlocalstorage();
    }
    
    modificarLibro(codigo: number, nuevoLibro: Libro) {
        const index = this.listalibros.findIndex(libro => libro.codigo === codigo);
        if (index !== -1) {
            this.listalibros[index] = nuevoLibro;
            this.guardarlocalstorage();
        } else {
            console.log("Libro no encontrado");
        }
    }
    Modificar(pos: number, op: Libro) {
        this.listalibros[pos] = op;
        this.guardarlocalstorage();
      }

    eliminarLibro(codigo: number) {
        this.listalibros = this.listalibros.filter(libro => libro.codigo !== codigo);
        this.guardarlocalstorage();
    }
    buscarLibro(codigo: number): Libro | undefined {
        return this.listalibros.find(libro => libro.codigo === codigo);
    }
    
    Listar(){
        for(let i=0; i<this.libros.length;i++){
            console.table(this.libros[i]);
    }
    }
    private guardarlocalstorage (){
        localStorage.setItem('libro',JSON.stringify(this.listalibros));
    }
    private predefinidos(){
        this.listalibros.push(new Libro("Libro",1, "Ficción", "Editorial A", "El Quijote", "Miguel de Cervantes", 1605,true));
        this.listalibros.push(new Libro("Libro",2, "Fantasía", "Editorial B", "Harry Potter y la piedra filosofal", "J.K. Rowling", 1997,true));
        this.listalibros.push(new Libro("Libro",3, "Ciencia Ficción", "Editorial C", "El juego de Ender", "Orson Scott Card", 1985,true));
        this.listalibros.push(new Libro("Libro",4, "Misterio", "Editorial D", "El código Da Vinci", "Dan Brown", 2003,true));
        this.listalibros.push(new Libro("Libro",5, "Aventura", "Editorial E", "Las aventuras de Tom Sawyer", "Mark Twain", 1876,true));
        this.listalibros.push(new Libro("Libro",6, "Revista de Ciencia", "Editorial A", "Artículos sobre avances científicos","Ramiro", 1813,true));
        this.listalibros.push(new Libro("Libro",7, "Revista de Viajes", "Editorial C", "Destinos turísticos populares", "Samuel", 1989,true));
        this.listalibros.push(new Libro("Libro",8, "Revista de Tecnología", "Editorial F", "Últimas novedades tecnológicas","Jeiner", 1977,true));
        this.listalibros.push(new Libro("Libro",9, "Revista de Entretenimiento", "Editorial H", "Reseñas de películas, música y más","Guncay", 2011,true));
        this.listalibros.push(new Libro("Libro",10, "Revista de Negocios", "Editorial J", "Artículos sobre finanzas y emprendimiento","Rebeca", 1997,true));
    }
}