const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const btnVaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulos = []

// eventos al dar click
listaCursos.addEventListener('click', e => {agregarCurso(e) });

// eliminarCurso del carrito
carrito.addEventListener('click',  e => { eliminarCurso(e) })

// vaciar el carrito
btnVaciarCarrito.addEventListener('click', () => {
    articulos = []

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }    
})

// Muestra los cursos de localstorage
document.addEventListener('DOMContentLoaded', () => {
    articulos = JSON.parse( localStorage.getItem('carrito') ) || []

    carritoHTML()
})

// Funciones al dar click
const agregarCurso = e => {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado)
    }
}

// lee el contenido del html al dar click, nos da la informacion del curso

const leerDatosCurso = curso => {
    
    // Creamos un objeto con la informacion del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // valida si un elemento ya esta en el arreglo por medio del id
    const existe = articulos.some(curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulos.map( curso =>{
            if (curso.id === infoCurso.id){
                curso.cantidad++
                return curso // retorna el objeto actualizado
            }else{
                return curso // retorna los objetos que no son duplicados
            }
        })
        articulos = [...cursos]
    }else{
        // Agrega elementos al carrito
        articulos = [...articulos, infoCurso]
    }

    console.log(articulos)

    carritoHTML()
}

// muestra los articulos en el carrito
const carritoHTML = () => {

    // limpia el html antes de recorrer el carrito
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    // recorre el carrito y pinta el html 
    articulos.forEach( datos => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td> <img src="${datos.imagen}" width="100"> </td>
            <td> ${datos.titulo} </td>
            <td> ${datos.precio} </td>
            <td> ${datos.cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${datos.id}"> X </a>
            </td>


        `;
        // agrega el contenido en el tbody
        contenedorCarrito.appendChild(row);
    })

    // Sicoronizar con localstorage
    sincronizarStorage()

}

// funcion para agregar datos al localstorage
const sincronizarStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(articulos))
}



// eliminar articulo del curso
const eliminarCurso = e => {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        // eliminar del arreglo por el data-id
        articulos = articulos.filter( curso => curso.id !== cursoId)

        carritoHTML();
    }
}