document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const barraMenu = document.getElementById('barra-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        barraMenu.classList.toggle('active');
        body.classList.toggle('menu-active');
        document.querySelector('.barra-superior').classList.toggle('menu-active');
    });

    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('click', (event) => {
            const submenu = menuItem.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('active');
                menuItem.querySelector('.arrow').classList.toggle('rotate');
                event.preventDefault(); // Evita la navegación al hacer clic en el enlace
            }
        });
    });
});



//para que funcione las vistas//
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            // Remover la clase activa de todos los botones
            buttons.forEach(btn => btn.classList.remove("text-blue-500", "font-semibold"));
            buttons.forEach(btn => btn.classList.add("text-gray-500"));

            // Agregar clase activa al botón seleccionado
            this.classList.remove("text-gray-500");
            this.classList.add("text-blue-500", "font-semibold");

            // Ocultar todos los contenidos
            contents.forEach(content => content.classList.add("hidden"));

            // Mostrar el contenido de la pestaña seleccionada
            document.getElementById(this.dataset.tab).classList.remove("hidden");
        });
    });
});

//formulario emergente//
document.addEventListener("DOMContentLoaded", function() {
    const abrirFormulario = document.getElementById("abrir-formulario");
    const popup = document.getElementById("formulario-popup");
    const cerrar = document.querySelector(".cerrar");

    abrirFormulario.addEventListener("click", function() {
        popup.style.display = "flex";
    });

    cerrar.addEventListener("click", function() {
        popup.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const mostrarFormularioBtn = document.getElementById('mostrarFormularioBtn');
    const mostrarFormulariofor = document.getElementById('mostrarFormulariofor');
    const cancelarFormularioBtn = document.getElementById('cancelarFormularioBtn');

    mostrarFormularioBtn.addEventListener('click', function() {
        mostrarFormulariofor.style.display = 'block';
    });

    cancelarFormularioBtn.addEventListener('click', function() {
        mostrarFormulariofor.style.display = 'none';
    });
});


   