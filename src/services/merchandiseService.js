export async function createMerchandise(merchandiseData) {
    const apiUrl = 'http://localhost:8080/logisticAPP/v1/merchandises';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(merchandiseData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error del servidor: ${errorData.message || 'Sin detalles'}`);
        }
    } catch (error) {
        console.error('Error en el servicio:', error);
        throw error;
    }
}

export async function fetchZones() {
    const apiUrl = 'http://localhost:8080/logisticAPP/v1/winery_zones';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener las zonas de la API');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener zonas:', error);
        throw error;
    }
}
