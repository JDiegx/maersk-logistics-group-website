import { submitMerchandise, getMerchandise } from '../services/merchandiseService.js';
import { getZones } from '../services/zoneService.js';

const form = document.getElementById('merchandiseForm');
const zonesSelect = document.getElementById('zones');
const goodsContainer = document.getElementById('goods-container-goods-view'); // Contenedor para las mercancías

// Cargar las zonas al inicio
async function loadZones() {
    try {
        const zones = await getZones();

        zones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone.zoneId;
            option.textContent = zone.zoneName;
            zonesSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar zonas:", error);
        alert("Hubo un problema al cargar las zonas. Intenta más tarde.");
    }
}

// Cargar las mercancías al inicio
async function loadMerchandise() {
    try {
        const merchandiseList = await getMerchandise(); // Obtiene las mercancías de la API

        // Limpiar el contenedor antes de agregar nuevas mercancías
        goodsContainer.innerHTML = '';

        merchandiseList.forEach(merch => {
            const merchDiv = document.createElement('div');
            merchDiv.classList.add('goods-view__details');

            merchDiv.innerHTML = `
                <h1 class="goods-view__title">Mercancía: ${merch.names}</h1>
                <p class="goods-view__description">Description: ${merch.description}</p>
                <div class="goods-view__date">
                    <p class="goods-view__entry-date"><strong>Entry Date:</strong> ${merch.entryDate}</p>
                    <p class="goods-view__exit-date"><strong>Exit Date:</strong> ${merch.departureDate}</p>
                </div>
                <p class="goods-view__zone">Zone: ${merch.zoneName}</p>
            `;

            goodsContainer.appendChild(merchDiv);
        });
    } catch (error) {
        console.error("Error al cargar mercancías:", error);
        alert("Hubo un problema al cargar las mercancías. Intenta más tarde.");
    }
}

// Llamar a loadZones y loadMerchandise al cargar la página
loadZones();