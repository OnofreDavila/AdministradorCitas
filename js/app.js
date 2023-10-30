// 1 selecion de los input de HTML

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// 2 selecion de los elementos form y contenedor de salida de citas del HTML

const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

//variable para la selecion de edicion 
let editando;

//6 Creo las dos clases que seran usadas y declaro dos objetos de dichas clases a nivel global
class Citas {
    constructor() {
        this.citas = [];
    } 

    agregarCita(cita) {
        this.citas = [...this.citas, cita ];
        console.log(this.citas);
    }

    eliminarCita(id) { 
        this.citas = this.citas.filter(cita => cita.id !== id );
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}

class UI {

    // 8 creo la funcion imprimirAlerta para la la validacion de datos del form 
    imprimirAlerta( mensaje, tipo ){
    //crear un DIV para el mensaje de alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
    
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        } else {                divMensaje.classList.add('alert-success');
            }
    
        //Mensaje de error
        divMensaje.textContent = mensaje;
    
        //Insertar en el html (agregar al DOM)
        document.querySelector('#contenido').insertBefore (divMensaje, document.querySelector('.agregar-cita'));
    
         //quitar del HTML
        setTimeout(()=> {
            divMensaje.remove();
        }, 3000 );
    }

    //funcion para imprimir citas en el HTML
    imprimirCitas ({citas}){

        this.limpiarHTML();

        citas.forEach ( cita => {

            //extraer cada key de la cita para poder mostrarlo en el HTML
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            // creo un Div padre para mostrar los key de la cita
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weigth-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">sintomas: </span> ${sintomas}
            `;

            //Boton para eliminar esta cita
            const btnElminar = document.createElement('button');
            btnElminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnElminar.innerHTML = 'Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnElminar.onclick = () => eliminarCita(id);

            //Boton para editar la cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg>'
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnElminar);
            divCita.appendChild(btnEditar);

            //agregar divCita al HTML
            contenedorCitas.appendChild(divCita);
        })

        console.log(citaObj);
        console.log(administrarCitas);
    }

     //limpiar contenedor anterior para no reimprimir
     limpiarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const ui = new UI();
const administrarCitas = new Citas();


// 3 Creo los eventos de los input para recoger la informacion

eventListeners();
function eventListeners () {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// 4 creo un objeto para recoger la informacion y el cual sera usado en la  funcion datosCita para la recolecion de entradas

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}

// 5 creo la funcion datosCita el cual recogera la info de los input y los agregara al objeto citaObj

function datosCita (e) {
    citaObj[e.target.name] = e.target.value; //esto solo funciona si el "name" del input en el HTML es igual al nombre del key del objeto, en este caso del objeto citaObj
}

//7 creo la funcion para agregar una nueva cita a la clase de cita
function nuevaCita(e) {
    e.preventDefault();

    //aplico destruc para extraer la informaion del objeto citaObj y poder validarla
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a (edicion
        administrarCitas.editarCita({...citaObj});

        //Reinicia el texto del boton
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita ';

        //quitar el modo edicion
        editando = false;
    } else {
        //generar un id a la cita
        citaObj.id = Date.now();

        //crear cita para agregar al array de citas y mostrar en el HTML
        administrarCitas.agregarCita( {...citaObj} );
        
        //mensaje de agregar cita
        ui.imprimirAlerta('Se agrego correctamente');

    }

    //reinicar el objeto citaObj para la validacion
    reinicarObjeto();

    //Reiniciar los input del form 
    formulario.reset();

    //mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    //Eliminar la cita 
    administrarCitas.eliminarCita(id);

    //muestra un mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo edicion
function cargarEdicion (cita) { 
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita; //aplicamos destructioning 

    //llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto global, es decir, citaObj
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    

    //aseguramos la validacion "true" con la variable "editando" 
    editando = true;

}