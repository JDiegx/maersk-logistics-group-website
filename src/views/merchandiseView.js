import { createMerchandise, fetchZones } from '../services/merchandiseService.js';

document.getElementById('merchandiseForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Capturar los valores de los inputs
    const names = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const occupiedVolume = parseFloat(document.getElementById('occupiedVolume').value);
    const occupiedWeight = parseFloat(document.getElementById('occupiedWeight').value);
    const entryDate = document.getElementById('entryDate').value;
    const departureDate = document.getElementById('departureDate').value;

    // Validación de los campos obligatorios
    if (!names || !description || !occupiedVolume || !occupiedWeight || !entryDate || !departureDate) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Crear el objeto con los datos
    const merchandiseData = {
        occupiedVolume,
        occupiedWeight,
        names,
        description,
        entryDate,
        departureDate
    };

    // Llamar al servicio para enviar los datos
    try {
        await createMerchandise(merchandiseData);
        alert('Mercancía creada con éxito');
        document.getElementById('merchandiseForm').reset(); // Limpiar formulario
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al crear la mercancía. Revisa los datos enviados.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const zonesSelect = document.getElementById('zones');

    try {
        const zones = await fetchZones();

        // Llenar el select con las zonas obtenidas
        zones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone.zoneName;
            option.textContent = zone.zoneName;
            option.className = 'goods-container__option';
            zonesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las zonas:', error);
        alert('Hubo un error al cargar las zonas. Intente nuevamente más tarde.');
    }
});