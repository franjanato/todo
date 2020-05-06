import {Todo} from '../classes';

import {todoList} from '../index';

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');




export const crearTodoHTML = ( todo ) => {

    const htmlTodo= `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class1="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.append( div.firstElementChild ); // firstElementChild va a retrnar el primer elemento hijo del elemento que se creo en este caso creamos el <div> y se va a añadir solo el elemento siguiente que es el <li>

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if (event.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHTML(nuevoTodo);

        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (event) => {


    const nombreElemento = event.target.localName; // devuelve si se dio click en un input, label, button
    const todoElemento   = event.target.parentElement.parentElement; // devuelve todo el li
    const todoId         = todoElemento.getAttribute('data-id'); // devuelve el valor del data-id

    if ( nombreElemento.includes('input') ){ //si hace click en el che
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed')

    } else if( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild ( todoElemento );
    }
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletado();

    for ( let i = divTodoList.children.length-1; i>=0; i-- ) {

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {

    const    filtro = event.target.text;
    if( !filtro ) {

        return ;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        

        switch( filtro ) {

            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                } 
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }

        }
    }

});



