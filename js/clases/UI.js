import { eliminarCita, cargarEdicion} from '../funciones.js';
import {contenedorCitas, heading} from '../selectores.js';

class UI {

    constructor ({citas}) {
        this.textoHeading(citas);
    }
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
    imprimirCitas ({citas}){ //aplicar destructuring desde la funcion..

        this.limpiarHTML();

        this.textoHeading(citas);

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
    }

    textoHeading(citas){
        if(citas.length > 0){
            heading.textContent = 'Administrar tus Citas.'
        }else{
            heading.textContent = 'No hay Citas, comienza creando una.'
        }
    }

     //limpiar contenedor anterior para no reimprimir
     limpiarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

export default UI;