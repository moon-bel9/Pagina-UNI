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



/*para que el acordeon se desplegue*/
document.addEventListener("DOMContentLoaded", function() {
    const acordion = document.querySelectorAll(".acordion");

    acordion.forEach(acordion => {
        acordion.addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    });
});