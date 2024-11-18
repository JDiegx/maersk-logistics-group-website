// zonesView.js
import { getZones } from '../services/zoneService.js';
import { createZone } from '../services/zoneService.js';

async function renderZones() {
    try {
        const zones = await getZones(); // Obtenemos las zonas desde el backend

        const zonesContainer = document.querySelector('.zones-container__zones-view-container');
        zonesContainer.innerHTML = ''; // Limpiamos el contenedor antes de añadir nuevas zonas

        const zoneNames = new Set(); // Para llevar el control de los nombres de las zonas y evitar duplicados

        zones.forEach(zone => {
            zoneNames.add(zone.zoneName); // Guardamos los nombres de las zonas en el set

            // Creamos un bloque para cada zona
            const zoneElement = document.createElement('div');
            zoneElement.classList.add('zone-item'); // Clase para cada zona

            zoneElement.innerHTML = `<h3>${zone.zoneName}</h3>`;

            // Insertamos el bloque de la zona en el contenedor
            zonesContainer.appendChild(zoneElement);
        });

        return zoneNames; // Devolvemos el set de nombres de zonas
    } catch (error) {
        console.error("Error al renderizar las zonas:", error);
        alert("Hubo un error al obtener las zonas.");
    }
}

// Llamamos a renderZones cuando se cargue la página
async function initializeZonesView() {
    const zoneNames = await renderZones();

    // Manejador de evento para el envío del formulario de creación de zona
    document.getElementById("zoneForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Evita el envío por defecto del formulario

        // Capturamos los valores de los inputs
        const zoneName = document.getElementById("zoneName").value;
        const maxVolume = parseFloat(document.getElementById("maxVolume").value);
        const maxWeight = parseFloat(document.getElementById("maxWeight").value);

        // Validamos si el nombre de la zona ya existe
        if (zoneNames.has(zoneName)) {
            alert("Ya existe una zona con este nombre. Por favor elige otro nombre.");
            return; // Evita el envío del formulario si el nombre de la zona ya está registrado
        }

        // Construimos los datos en formato JSON
        const data = {
            zoneName: zoneName,
            maxVolume: maxVolume,
            maxWeight: maxWeight,
            occupiedVolume: 0.1, // Valor inicial
            occupiedWeight: 0.1  // Valor inicial
        };

        try {
            // Enviamos la solicitud POST para crear la nueva zona
            const response = await createZone(data);

            if (response.ok) {
                const result = await response.json();
                alert("Zona creada exitosamente!");
                console.log(result);

                // Limpiamos el formulario
                document.getElementById("zoneForm").reset(); // Resetea todos los campos del formulario

                // Recargamos las zonas para reflejar la nueva zona creada
                const updatedZoneNames = await renderZones(); // Vuelve a renderizar las zonas con los datos actualizados
            } else {
                const error = await response.json();
                alert("Error al crear la zona: " + (error.message || response.statusText));
                console.error(error);
            }
        } catch (err) {
            console.error("Error en la solicitud:", err);
            alert("Ocurrió un error inesperado.");
        }
    });
}

// Inicializamos la vista de zonas cuando la página se cargue
initializeZonesView();