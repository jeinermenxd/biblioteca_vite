import { TlistaEstudiante } from "../Controlador/Tlistaestudiante";
import { TlistaPrestamos } from "../Controlador/Tlistaprestamos";
import { Prestamo } from "../Entidades/prestamos";
import { Libro } from "../Entidades/libro";
import { Tlistalibro } from "../Controlador/Tlistalibro";
import { Estudiante } from "../Entidades/estudiantes";

const crud = new TlistaPrestamos();
const crude = new TlistaEstudiante();
const crudl = new Tlistalibro();

const cedula = document.querySelector(
  "#categoriaEstudiante"
) as HTMLInputElement;
const codigo = document.querySelector("#categoriaLibros") as HTMLInputElement;
const fechainicio = document.querySelector("#fecha_inicio") as HTMLInputElement;
const fechafin = document.querySelector("#fecha_fin") as HTMLInputElement;
var index1 = 0;
var index2 = 0;

let banderainsert = false;
let posedit = 0;
Listar(crud);


export function cargarcomboxE() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "categoriaEstudiante"
    ) as HTMLSelectElement;
  
    selectCategoriaRevistas.addEventListener("change", () => {
      index1 = selectCategoriaRevistas.selectedIndex - 1;
    });
  
    crude.listaestudianteaux.forEach((estudiante, index) => {
      if (estudiante.status == true) {
        const option = document.createElement("option");
        option.value = JSON.stringify(estudiante);
        option.textContent = `${estudiante.cedula}`;
        selectCategoriaRevistas.appendChild(option);
      }
  
    });
  });
}
cargarcomboxE();

export function cargarcomboxL() {
  const selectCategoriaRevistas = document.getElementById(
    "categoriaLibros"
  ) as HTMLSelectElement;
  selectCategoriaRevistas.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "Seleccionar";
  selectCategoriaRevistas.appendChild(option);

  selectCategoriaRevistas.addEventListener("change", () => {
    index2 = selectCategoriaRevistas.selectedIndex - 1;
  });

  crudl.listalibros.forEach((categoria, index) => {
    if (categoria.prestado == true) {
      const option = document.createElement("option");
      option.value = JSON.stringify(categoria);
      option.textContent = `${categoria.codigo}`;
      selectCategoriaRevistas.appendChild(option);
    }
  });
}

cargarcomboxL();
document
  .querySelector(".btn-guardar")!
  .addEventListener("click", () => Guardar());

document
  .querySelector(".btn-cerrar")!
  .addEventListener("click", () => limpiarCampos());

export function Guardar() {
  if (banderainsert == true) {
    const aux = new Prestamo(
      cedula.value,
      codigo.value,
      fechainicio.value,
      fechafin.value
    );

    crud.modificarPrestamo(posedit, aux);

    limpiarCampos();

    const body = document.querySelector("tbody")!;
    body.innerHTML = ""; // Eliminar contenido anterior de la tabla
    Listar(crud); // Volver a listar los Prestamo actualizados
    banderainsert = false;
    console.log(crud.prestamos);
  } else {
    insertar();
    limpiarCampos();
  }
}

export function insertar() {
  ////estudiante
  const cedulaJSON = JSON.parse(cedula.value);
  ////libro
  const codigoJSON = JSON.parse(codigo.value);

  const op = new Prestamo(
    cedulaJSON.cedula,
    codigoJSON.codigo,
    fechainicio.value,
    fechafin.value
  );
  const aux = new Libro(
    codigoJSON.tipo,
    codigoJSON.codigo,
    codigoJSON.categoria,
    codigoJSON.editorial,
    codigoJSON.nombre,
    codigoJSON.autor,
    codigoJSON.añoPublicacion,
    (codigoJSON.prestado = false)
  );

  const aux2 = new Estudiante(
    cedulaJSON.idestudiante,
    cedulaJSON.cedula,
    cedulaJSON.nombre,
    cedulaJSON.apellido,
    cedulaJSON.sexo,
    cedulaJSON.fecha_Nacimiento,
    cedulaJSON.staus = true
  );

  const estudiante = crude.listaestudianteaux.find(
    (estudiante) => estudiante.cedula === aux2.cedula
  );
  const index1 = crude.listaestudianteaux.findIndex(
    (estudiante) => estudiante.cedula === aux2.cedula
  );
  if (estudiante) {
    console.log(index1);
    estudiante.librosPrestados.push(aux);
    crude.Modificar(index1, estudiante);
  } else {
    console.log("Estudiante no encontrado.");
  }

  const index2 = crudl.listalibros.findIndex(
    (libros) => libros.codigo === aux.codigo
  );
  if (index2 !== -1) {
    crudl.Modificar(index2, aux);
    crudl.Listar();
  }

  console.log(op);
  console.log(aux);

  crud.insertarPrestamo(op);

  Listar(crud);
  crude.Listar();
  cargarcomboxL();
  cargarcomboxE();
  console.log(crude.listaestudianteaux);
}

function limpiarCampos() {
  cedula.value = "";
  codigo.value = "";
  fechainicio.value = "";
  fechafin.value = "";
  banderainsert = false;
}

export function cargar(pos: number, op: any) {
  cedula.value = op.dni;
  codigo.value = op.codigo;
  fechainicio.value = op.fecha_prestamo;
  fechafin.value = op.fecha_fin;

  posedit = pos;
  banderainsert = true;
}

export function eliminar(pos: number) {
  crud.eliminarPrestamo(pos);
  Listar(crud);
  console.log(crud.prestamos);
}

// Función para agregar o actualizar un producto en la tabla
export function Listar(op: TlistaPrestamos) {
  const body = document.querySelector("tbody")!;
  body.innerHTML = ""; // Eliminar contenido anterior de la tabla

  const clase =
    "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

  op.listaprestamosaux.forEach((libro, index) => {
    // Añade el índice como segundo parámetro de la función forEach
    const tabla = document.createElement("tr");

    const ced = document.createElement("td");
    ced.className = clase;
    ced.textContent = libro.codigoLibro;

    const cod = document.createElement("td");
    cod.className = clase;
    cod.textContent = libro.numeroCedula;

    const fechain = document.createElement("td");
    fechain.className = clase;
    fechain.textContent = libro.fechaPrestamo;

    const fechafin = document.createElement("td");
    fechafin.className = clase;
    fechafin.textContent = libro.fechaEntrega;

    const edit = document.createElement("td");
    const botonContainer = document.createElement("div");

    const botonEliminar = document.createElement("button");
    botonEliminar.className =
      "btnBorrar btn btn-danger focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    botonEliminar.innerHTML = "Eliminar";

    botonContainer.appendChild(botonEliminar);

    edit.appendChild(botonContainer);

    botonContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target === botonEliminar) {
        console.log("Eliminando libro en la posición:", index);
        eliminar(index);
      }
    });

    tabla.append(ced, cod, fechain, fechafin, edit);

    const body = document.querySelector("tbody")!;
    body.prepend(tabla);
  });
}
