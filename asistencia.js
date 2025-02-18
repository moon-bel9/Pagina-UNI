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






document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const selectSemestre = document.getElementById('select-semestre');
    const tablaAsistencias = document.getElementById('tabla-asistencias');
    const botonMarcar = document.querySelector('.btn-asistencia');
    
    // Verificar si los elementos existen en el DOM
    if (!selectSemestre || !tablaAsistencias || !botonMarcar) {
        console.error("Elementos no encontrados en el DOM.");
        return;
    }
    
    // Cargar asistencias desde localStorage o inicializar un array vacío
    let asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
    
    // Función para guardar las asistencias en localStorage
    function guardarAsistencias() {
        localStorage.setItem('asistencias', JSON.stringify(asistencias));
    }
    
    // Función para actualizar la tabla de asistencias según el semestre seleccionado
    function actualizarTabla() {
        const semestreSeleccionado = parseInt(selectSemestre.value);
        // Filtrar las asistencias del semestre seleccionado
        const asistenciasFiltradas = asistencias.filter(a => a.semestre === semestreSeleccionado);
        
        // Crear el contenido de la tabla
        let contenido = `
            <tr>
                <th>Fecha</th><th>Curso</th><th>Sección</th>
                <th>Hora</th><th>Entrada</th><th>Salida</th>
                <th>Estado</th>
            </tr>`;
        
        // Agregar las filas con la información de asistencias
        asistenciasFiltradas.forEach(asistencia => {
            contenido += `
                <tr>
                    <td>${asistencia.fecha}</td>
                    <td>${asistencia.codCurso}</td>
                    <td>${asistencia.secCurso}</td>
                    <td>${asistencia.hora}</td>
                    <td>${asistencia.horEntrada || '—'}</td>
                    <td>${asistencia.horSalida || '—'}</td>
                    <td>${asistencia.estado === 1 ? 'Presente' : 'Ausente'}</td>
                </tr>`;
        });
        
        // Insertar el contenido en la tabla
        tablaAsistencias.innerHTML = contenido;
    }
    
    // Evento para marcar la asistencia
    botonMarcar.addEventListener('click', () => {
        const fechaHoy = new Date().toISOString().split('T')[0]; // Obtener la fecha actual
        const semestreSeleccionado = parseInt(selectSemestre.value);
        
        // Buscar si ya existe una asistencia para hoy y el semestre seleccionado
        let asistencia = asistencias.find(a => a.fecha === fechaHoy && a.semestre === semestreSeleccionado);
        
        if (!asistencia) {
            // Si no hay asistencia, registrar la entrada
            asistencia = {
                id: asistencias.length + 1,
                codDocente: 87546374,
                fecha: fechaHoy,
                codCurso: "BMA03",
                secCurso: "A",
                teopra: "T/P",
                hora: "15-17",
                horEntrada: new Date().toLocaleTimeString(),
                horSalida: "",
                semestre: semestreSeleccionado,
                estado: 1
            };
            asistencias.push(asistencia);
        } else if (!asistencia.horSalida) {
            // Si ya se marcó la entrada, registrar la salida
            asistencia.horSalida = new Date().toLocaleTimeString();
        }
        
        // Guardar los cambios y actualizar la tabla
        guardarAsistencias();
        actualizarTabla();
    });
    
    // Evento para actualizar la tabla cuando se cambia de semestre
    selectSemestre.addEventListener('change', () => {
        actualizarTabla();
    });
    
    // Llamar a la función para mostrar la tabla al cargar la página
    actualizarTabla();
});
