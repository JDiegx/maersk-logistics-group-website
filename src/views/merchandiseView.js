import { submitMerchandise } from '../services/merchandiseService.js'; // Corrección en el nombre del archivo
import { getZones } from '../services/zoneService.js';

const form = document.getElementById('merchandiseForm');
const zonesSelect = document.getElementById('zones');

// Cargar las zonas al inicio
async function loadZones() {
    try {
        const zones = await getZones(); // Obtiene las zonas de la API

        // Agregar las opciones al select
        zones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone.zoneId; // Asigna el ID de la zona al value
            option.textContent = zone.zoneName; // Muestra el nombre de la zona
            zonesSelect.appendChild(option); // Agrega la opción al select
        });
    } catch (error) {
        console.error("Error al cargar zonas:", error);
        alert("Hubo un problema al cargar las zonas. Intenta más tarde.");
    }
}

// Llamar a loadZones para cargar las zonas cuando la página se carga
loadZones();

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el envío del formulario de la manera tradicional

    // Obtener los valores de los campos
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const occupiedVolume = parseFloat(document.getElementById('occupiedVolume').value);
    const occupiedWeight = parseFloat(document.getElementById('occupiedWeight').value);
    const entryDate = document.getElementById('entryDate').value;
    const departureDate = document.getElementById('departureDate').value;
    const zoneId = zonesSelect.value; // Obtener el ID de la zona seleccionada
    const customerId = 1; // Valor por defecto

    if (!zoneId) {
        alert("Por favor selecciona una zona válida.");
        return;
    }

    const payload = {
        occupiedVolume,
        occupiedWeight,
        names: name,
        description,
        entryDate,
        departureDate,
        wineryZoneId: zoneId, // Convertir zoneId a wineryZoneId
        customerId, // Valor por defecto
    };

    console.log("Payload enviado:", payload);

    try {
        const result = await submitMerchandise(payload);
        if (result.success) {
            alert('Formulario enviado exitosamente.');
            form.reset(); // Limpiar el formulario
        } else {
            alert('Error al enviar el formulario. Por favor, inténtalo nuevamente.');
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Ocurrió un error al enviar el formulario. Intenta más tarde.");
    }
});
