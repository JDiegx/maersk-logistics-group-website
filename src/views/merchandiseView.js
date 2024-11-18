import { getZones } from '../services/zoneService.js'; // Asegúrate de tener esta función en tu archivo de servicio

document.addEventListener("DOMContentLoaded", async function () {
    // Llamar a la API para obtener las zonas disponibles
    try {
        const zones = await getZones(); // Obtener las zonas desde el backend

        // Obtener el elemento select donde se van a añadir las opciones
        const zonesSelect = document.getElementById("zones");

        // Limpiar las opciones existentes (en caso de que haya opciones previas)
        zonesSelect.innerHTML = '';

        // Agregar una opción por cada zona
        zones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone.winery_zones_id; // Usamos el ID de la zona
            option.textContent = zone.zoneName; // Nombre visible para el usuario
            zonesSelect.appendChild(option); // Añadir la opción al select
        });

    } catch (error) {
        console.error("Error al obtener las zonas:", error);
        alert("Hubo un error al cargar las zonas.");
    }
});

// Ahora manejamos el envío del formulario
document.getElementById('merchandiseForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita el envío por defecto del formulario

    // Captura los valores del formulario
    const names = document.getElementById('names').value;
    const description = document.getElementById('description').value;
    const occupiedVolume = parseFloat(document.getElementById('occupiedVolume').value);
    const occupiedWeight = parseFloat(document.getElementById('occupiedWeight').value);
    const entryDate = document.getElementById('entryDate').value;
    const departureDate = document.getElementById('departureDate').value;

    // Captura las zonas seleccionadas (ahora capturamos los IDs de las zonas)
    const selectedZones = Array.from(document.getElementById('zones').selectedOptions).map(option => option.value);

    // Construcción del JSON con los datos
    const data = {
        names: names,
        description: description,
        occupiedVolume: occupiedVolume,
        occupiedWeight: occupiedWeight,
        entryDate: entryDate,
        departureDate: departureDate,
        winery_zones_ids: selectedZones  // Agregar los IDs de las zonas seleccionadas
    };

    try {
        // Usamos la función para crear mercancías en el backend
        const response = await createMerchandise(data);

        if (response.ok) {
            alert('Mercancía creada correctamente');
            // Limpiar el formulario
            document.getElementById('merchandiseForm').reset();
        } else {
            const error = await response.json();
            alert('Error al crear la mercancía: ' + (error.message || response.statusText));
        }
    } catch (err) {
        console.error('Error en la solicitud:', err);
        alert('Hubo un error inesperado al crear la mercancía.');
    }
});
