import { Libro } from "../Entidades/libro";
import { Tlistalibro } from "../Controlador/Tlistalibro";

const guardarLibroBtn = document.getElementById("guardarLibroBtn");
const controlador = new Tlistalibro();

// Insertar libros
/*controlador.insertarLibro(new Libro(1, "Ficción", "Editorial A", "El Quijote", "Miguel de Cervantes", 1605));
controlador.insertarLibro(new Libro(2, "Fantasía", "Editorial B", "Harry Potter y la piedra filosofal", "J.K. Rowling", 1997));
controlador.insertarLibro(new Libro(3, "Ciencia Ficción", "Editorial C", "El juego de Ender", "Orson Scott Card", 1985));
controlador.insertarLibro(new Libro(4, "Misterio", "Editorial D", "El código Da Vinci", "Dan Brown", 2003));
controlador.insertarLibro(new Libro(5, "Aventura", "Editorial E", "Las aventuras de Tom Sawyer", "Mark Twain", 1876));
controlador.insertarLibro(new Libro(6, "Romance", "Editorial F", "Orgullo y prejuicio", "Jane Austen", 1813));
controlador.insertarLibro(new Libro(7, "Histórico", "Editorial G", "Los pilares de la Tierra", "Ken Follett", 1989));
controlador.insertarLibro(new Libro(8, "Terror", "Editorial H", "El resplandor", "Stephen King", 1977));
controlador.insertarLibro(new Libro(9, "Biografía", "Editorial I", "Steve Jobs", "Walter Isaacson", 2011));
controlador.insertarLibro(new Libro(10, "Autoayuda", "Editorial J", "El poder del ahora", "Eckhart Tolle", 1997));*/

// Llamar a la función actualizarTabla() después de insertar todos los libros estáticos
actualizarTabla(controlador.listalibros);

guardarLibroBtn!.addEventListener("click", () => {
    const tipo =(<HTMLSelectElement>document.getElementById("tipo")).value;
    const codigo = (<HTMLInputElement>document.getElementById("codigo")).value;
    const categoria = (<HTMLSelectElement>document.getElementById("categoria")).value;
    const editorial = (<HTMLInputElement>document.getElementById("editorial")).value;
    const nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    const autor = (<HTMLInputElement>document.getElementById("autor")).value;
    const publicacion = (<HTMLInputElement>document.getElementById("publicacion")).value;
    const prestamo = (<HTMLInputElement>document.getElementById("idprestamo")).checked;

    if (codigo !== '') {
        // Si el campo de código no está vacío, significa que se está editando un libro existente
        const libro = new Libro(tipo,parseInt(codigo), categoria, editorial, nombre, autor, parseInt(publicacion),prestamo);
        controlador.modificarLibro(parseInt(codigo), libro); 
        
    } else {
        // Si el campo de código está vacío, significa que se está agregando un nuevo libro
        const nuevoLibro = new Libro(tipo,controlador.listalibros.length + 1, categoria, editorial, nombre, autor, parseInt(publicacion),prestamo);
        controlador.insertarLibro(nuevoLibro); 
    }
    actualizarTabla(controlador.listalibros);
    cerrarModal();
    limpiarCamposModal();
});


const insertarProductoBtn = document.getElementById('insertarProductoBtn');
const cerrarinsertar = document.getElementById('cerrarinsertar');


const modal = document.querySelector('.modal');

// Agrega un event listener al botón "Insertar Producto"
insertarProductoBtn!.addEventListener('click', () => {
    // Remueve la clase
    modal!.classList.remove('hidden');
});


cerrarinsertar!.addEventListener('click', () => {
    cerrarModal();
    limpiarCamposModal();
})


function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal!.classList.add('hidden');
    // Limpiar el campo 
    const codigoInput = document.getElementById('codigo') as HTMLInputElement;
    codigoInput.value = '';
}

function actualizarTabla(libros: Libro[]) {
    const tbody = document.querySelector('tbody');
    tbody!.innerHTML = ''; 

    libros.forEach(libro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-3">${libro.tipo}</td>
            <td class="px-6 py-3">${libro.codigo}</td>
            <td class="px-6 py-3">${libro.categoria}</td>
            <td class="px-6 py-3">${libro.editorial}</td>
            <td class="px-6 py-3">${libro.nombre}</td>
            <td class="px-6 py-3">${libro.autor}</td>
            <td class="px-6 py-3">${libro.añoPublicacion}</td>
            <td class="px-6 py-3">${libro.prestado}</td>
        `;
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2';
        editarBtn.addEventListener('click', () => editarLibro(libro));

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
        eliminarBtn.addEventListener('click', () => eliminarLibro(libro.codigo));

        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'text-center px-4 py-2';
        tdAcciones.appendChild(editarBtn);
        tdAcciones.appendChild(eliminarBtn);

        tr.appendChild(tdAcciones);
        tbody!.appendChild(tr);
    });
}

function limpiarCamposModal() {
    const campos = document.querySelectorAll('.modal input, .modal textarea');
    campos.forEach((campo: Element) => {
        if (campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) {
            campo.value = ''; 
        }
    });
}
// Función para editar un libro
function editarLibro(libro: Libro) {
    // Lógica para cargar
    const idtipo = document.getElementById('tipo') as HTMLInputElement;
    const codigoInput = document.getElementById('codigo') as HTMLInputElement;
    const categoriaInput = document.getElementById('categoria') as HTMLInputElement;
    const editorialInput = document.getElementById('editorial') as HTMLInputElement;
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const autorInput = document.getElementById('autor') as HTMLInputElement;
    const publicacionInput = document.getElementById('publicacion') as HTMLInputElement;
    const estado = document.getElementById('idprestamo') as HTMLInputElement;

    // Asignar los valores
    idtipo.value = libro.tipo;
    codigoInput.value = libro.codigo.toString();
    categoriaInput.value = libro.categoria;
    editorialInput.value = libro.editorial;
    nombreInput.value = libro.nombre;
    autorInput.value = libro.autor;
    publicacionInput.value = libro.añoPublicacion.toString();
    estado.checked = libro.prestado;

    modal!.classList.remove('hidden');
    

}

// Función para eliminar un libro
function eliminarLibro(codigo: number) {
    // Eliminar el libro de la lista según su código
    controlador.eliminarLibro(codigo);
    actualizarTabla(controlador.listalibros);
    console.table(controlador.listalibros);
}