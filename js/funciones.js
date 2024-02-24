import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import {
    mascotaInput,
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput,
    formulario
} from './selectores.js';


const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}

export function datosCita (e) {
    citaObj[e.target.name] = e.target.value; //esto solo funciona si el "name" del input en el HTML es igual al nombre del key del objeto, en este caso del objeto citaObj
}

export function nuevaCita(e) {
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

export function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    //Eliminar la cita 
    administrarCitas.eliminarCita(id);

    //muestra un mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo edicion
export function cargarEdicion (cita) { 
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