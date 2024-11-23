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

//tabla
const scheduleData = [
    {
        "day": "Martes",
        "time": "08-09",
        "subject": "MC510-C/D",
        "location": "Virtual",
        "type": "T",
        "capacity": 35,
        "duration": 2
    },
    {
        "day": "Martes",
        "time": "10-11",
        "subject": "MC510-E",
        "location": "Virtual",
        "type": "T",
        "capacity": 12,
        "duration":2
    },
    {
        "day": "Miercoles",
        "time": "08-09",
        "subject": "MC510-E",
        "location": "Virtual",
        "type": "P",
        "capacity": 12,
        "duration":3
    },
    {
        "day": "Viernes",
        "time": "08-09",
        "subject": "BICO1-F",
        "location": "Virtual",
        "type": "T",
        "capacity": 25,
        "duration":1
    },
    {
        "day": "Viernes",
        "time": "09-10",
        "subject": "BICO1-F",
        "location": "Virtual",
        "type": "P",
        "capacity": 25,
        "duration":2
    },
    {
        "day": "Miercoles",
        "time": "17-18",
        "subject": "MB545-C",
        "location": "Virtual",
        "type": "T",
        "capacity": 55,
        "duration":3
    },
    {
        "day": "Viernes",
        "time": "14-15",
        "subject": "MB545-C",
        "location": "Virtual",
        "type": "P",
        "capacity": 55,
        "duration":3
    }
];

// Mapeo de los horarios
const timeSlots = [
    "07-08", "08-09", "09-10", "10-11", "11-12", "12-13", 
    "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", 
    "19-20", "20-21", "21-22", "22-23"
];

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Crear la tabla del horario
const scheduleBody = document.getElementById('schedule-body');

// Mantener seguimiento de las celdas ya ocupadas
const cellMap = {};

// Función para determinar si una celda ya está ocupada
function isCellOccupied(day, time) {
    return cellMap[`${day}-${time}`];
}

// Función para marcar una celda como ocupada
function occupyCell(day, time) {
    cellMap[`${day}-${time}`] = true;
}

// Crear la tabla
timeSlots.forEach(timeSlot => {
    const row = document.createElement('tr');
    
    // Agregar la celda de la hora
    const timeCell = document.createElement('td');
    timeCell.textContent = timeSlot;
    row.appendChild(timeCell);

    // Agregar celdas para cada día
    daysOfWeek.forEach(day => {
        const cell = document.createElement('td');

        // Comprobar si la celda ya está ocupada por una clase anterior
        if (isCellOccupied(day, timeSlot)) {
            row.appendChild(cell);
            return;
        }

        // Encontrar la clase correspondiente
        const classData = scheduleData.find(classItem => classItem.time === timeSlot && classItem.day === day);

        if (classData) {
            const duration = classData.duration || 1;

            // Aplicar rowspan si la clase dura más de una hora
            if (duration > 1) {
                cell.setAttribute('rowspan', duration);

                // Marcar las celdas siguientes como ocupadas
                const startIndex = timeSlots.indexOf(timeSlot);
                for (let i = 0; i < duration; i++) {
                    const nextTime = timeSlots[startIndex + i];
                    occupyCell(day, nextTime);
                }
            }

            // Añadir contenido de la clase
            cell.classList.add('class');
            cell.innerHTML = `
                <span><strong>${classData.subject}</strong></span>
                <span class="class-time">(${classData.capacity}) ${classData.location} / ${classData.type}</span>
            `;
        }

        row.appendChild(cell);
    });

    scheduleBody.appendChild(row);
});
