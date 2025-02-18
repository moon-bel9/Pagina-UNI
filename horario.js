//menu manejo
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
            }0  
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const scheduleBody = document.getElementById("schedule-body");
    const semesterSelect = document.getElementById("semestre-select");

    function loadSchedule(semester) {
        console.log("Cargando horario para el semestre:", semester); // Verifica qué semestre se selecciona

        fetch("horario.json")
            .then(response => response.json())
            .then(data => {
                console.log("Datos cargados:", data); // Verifica si los datos se están cargando correctamente

                scheduleBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos
                
                // Filtrar los cursos por semestre
                const filteredSchedule = data.filter(clase => clase.semestre == semester);
                console.log("Cursos filtrados:", filteredSchedule); // Verifica si el filtro funciona

                if (filteredSchedule.length === 0) {
                    scheduleBody.innerHTML = "<tr><td colspan='8'>No hay cursos para este semestre</td></tr>";
                }

                filteredSchedule.forEach(clase => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${clase.hora}</td>
                        <td>${clase.dia}</td>
                        <td>${clase.codCurso}</td>
                        <td>${clase.nomCurso}</td>
                        <td>${clase.secCurso}</td>
                        <td>${clase.codDocente}</td>
                        <td>${clase.docente}</td>
                        <td>${clase.teopra}</td>
                    `;
                    scheduleBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error cargando el horario:", error));
    }

    semesterSelect.addEventListener("change", function () {
        loadSchedule(this.value);
    });

    // Cargar el horario inicial con el primer semestre seleccionado
    loadSchedule(semesterSelect.value);
});
