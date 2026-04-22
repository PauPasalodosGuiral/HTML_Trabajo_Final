const contenedor = document.querySelector('#contenedor-noticias');
const botonDestacar = document.querySelector('#btn-destacar');

async function cargarNoticias() {
    try {
        const respuesta = await fetch('noticias.json');
        
        if (!respuesta.ok) {
            throw new Error('Error al cargar el JSON');
        }

        const noticias = await respuesta.json();
        
        renderizarNoticias(noticias);

    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<p>No se han podido cargar las noticias.</p>';
    }
}

function renderizarNoticias(listaNoticias) {
    contenedor.innerHTML = '';

    listaNoticias.forEach(noticia => {
        const art = document.createElement('article');
        
        if (noticia.importante) {
            art.dataset.status = "importante";
        }

        art.innerHTML = `
            <header>
                <h3>${noticia.titulo}</h3>
                <span>${noticia.fecha} - <strong>${noticia.categoria}</strong></span>
            </header>
            <div class="cuerpo-noticia">
                <p>${noticia.contenido}</p>
            </div>
            <footer>
                <small>Referencia: NOT-${noticia.id}</small>
            </footer>
        `;

        contenedor.appendChild(art);
    });
}


botonDestacar.addEventListener('click', () => {

    const todosLosArticulos = document.querySelectorAll('article');

    todosLosArticulos.forEach(art => {

        if (art.dataset.status === "importante") {

            art.classList.toggle('noticia-destacada');
        }
    });
});

cargarNoticias();