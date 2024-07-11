import { Estudiante } from "../Entidades/estudiantes";
import { TlistaEstudiante } from "../Controlador/Tlistaestudiante";

const guardarLibroBtn = document.getElementById("guardarLibroBtn");
const controlador = new TlistaEstudiante();

// Insertar Estudiantes
/*controlador.insertarEstudiante(new Estudiante(1,"0750253478","Jeiner","Mendieta","Masculino","2002-05-06"));
controlador.insertarEstudiante(new Estudiante(2,"0987654321", "María", "Gómez", "Femenino", "2001-05-06"));
controlador.insertarEstudiante(new Estudiante(3,"1234567890", "Juan", "Pérez", "Masculino", "2003-05-06"));
controlador.insertarEstudiante(new Estudiante(4,"5678901234", "Ana", "López", "Femenino", "2001-05-06"));
controlador.insertarEstudiante(new Estudiante(5,"9876543210", "Pedro", "Ramírez", "Masculino", "2002-05-06"));
controlador.insertarEstudiante(new Estudiante(6,"5432109876", "Luisa", "Martínez", "Femenino", "2011-05-06"));
controlador.insertarEstudiante(new Estudiante(7,"1357924680", "Diego", "Hernández", "Masculino", "2001-05-06"));
controlador.insertarEstudiante(new Estudiante(8,"2468013579", "Laura", "Díaz", "Femenino", "2002-05-06"));
controlador.insertarEstudiante(new Estudiante(9,"1111111111", "Pepe", "García", "Masculino", "2010-05-06"));*/

// Llamar a la función actualizarTabla() después de insertar todos los Estudiantes estáticos
actualizarTabla(controlador.listaestudianteaux);

guardarLibroBtn!.addEventListener("click", () => {
    const idestudiante = (<HTMLInputElement>document.getElementById("idestudiante")).value;
    const cedula = (<HTMLInputElement>document.getElementById("cedula")).value;
    const nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    const apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
    const genero = (<HTMLInputElement>document.getElementById("genero")).value;
    const fechanacimiento = (<HTMLInputElement>document.getElementById("fechanacimiento")).value;
    const status = (<HTMLInputElement>document.getElementById("idstatus")).checked;

    if (idestudiante !== '') {
        // Si el campo de código no está vacío, significa que se está editando un Estudiante existente
        const estudiantes = new Estudiante(parseInt(idestudiante),cedula,nombre,apellido,genero,fechanacimiento,status);
        controlador.modificarEstudiante(parseInt(idestudiante), estudiantes); 
        
    } else {
        // Si el campo de código está vacío, significa que se está agregando un nuevo Estudiante
        const nuevoEstudiante = new Estudiante(controlador.listaestudianteaux.length + 1,cedula,nombre,apellido,genero,fechanacimiento,status);
        controlador.insertarEstudiante(nuevoEstudiante); 
    }
    actualizarTabla(controlador.listaestudianteaux);
    cerrarModal();
    limpiarCamposModal();
});


const insertarProductoBtn = document.getElementById('insertarProductoBtn');
const cerrarinsertar = document.getElementById('cerrarinsertar');


const modal = document.querySelector('.modal');


insertarProductoBtn!.addEventListener('click', () => {
   
    modal!.classList.remove('hidden');
});


cerrarinsertar!.addEventListener('click', () => {
    cerrarModal();
    limpiarCamposModal();
})


function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal!.classList.add('hidden');
 
    const codigoInput = document.getElementById('cedula') as HTMLInputElement;
    codigoInput.value = '';
}

function actualizarTabla(Estudiantes: Estudiante[]) {
    const tbody = document.querySelector('tbody');
    tbody!.innerHTML = ''; // Limpiar

    Estudiantes.forEach(Estudiante => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-3">${Estudiante.idestudiante}</td>
            <td class="px-6 py-3">${Estudiante.cedula}</td>
            <td class="px-6 py-3">${Estudiante.nombre}</td>
            <td class="px-6 py-3">${Estudiante.apellido}</td>
            <td class="px-6 py-3">${Estudiante.sexo}</td>
            <td class="px-6 py-3">${Estudiante.fechaNacimiento}</td>
            <td class="px-6 py-3">${Estudiante.status}</td>
        `;
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2';
        editarBtn.addEventListener('click', () => editarEstudiante(Estudiante));

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
        eliminarBtn.addEventListener('click', () => eliminarEstudiante(Estudiante.cedula));

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
            campo.value = ''; // Limpiar el valor del campo
        }
    });
}
// Función para editar un Estudiante
function editarEstudiante(Estudiante: Estudiante) {
    
    const codigoestudiante = document.getElementById('idestudiante') as HTMLInputElement;
    const codigoInput = document.getElementById('cedula') as HTMLInputElement;
    const categoriaInput = document.getElementById('nombre') as HTMLInputElement;
    const editorialInput = document.getElementById('apellido') as HTMLInputElement;
    const nombreInput = document.getElementById('genero') as HTMLInputElement;
    const autorInput = document.getElementById('fechanacimiento') as HTMLInputElement;
    const statuscodigo = document.getElementById('idstatus') as HTMLInputElement;

   
    codigoestudiante.value = Estudiante.idestudiante.toString();
    codigoInput.value = Estudiante.cedula;
    categoriaInput.value = Estudiante.nombre;
    editorialInput.value = Estudiante.apellido;
    nombreInput.value = Estudiante.sexo;
    autorInput.value = Estudiante.fechaNacimiento;
    statuscodigo.checked = Estudiante.status;

 
    modal!.classList.remove('hidden');
    
}

// Función para eliminar un Estudiante
function eliminarEstudiante(codigo: string) {
    // Eliminar el Estudiante de la lista según su código
    controlador.eliminarEstudiante(codigo);

    //
    actualizarTabla(controlador.listaestudianteaux);
    console.table(controlador.estudiantes);
}