async function createMerchandise(data) {
    try {
        const response = await fetch('http://localhost:8080/logisticAPP/v1/merchandises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Enviar los datos como JSON
        });

        if (!response.ok) {
            throw new Error('Error al crear la mercancía');
        }

        return response; // Si la respuesta es exitosa, la retornamos
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; // Propagamos el error
    }
}

export async function getZones() {
    try {
        const response = await fetch('http://localhost:8080/logisticAPP/v1/winery_zones');
        if (!response.ok) {
            throw new Error('No se pudieron cargar las zonas');
        }
        return await response.json(); // Retorna las zonas desde la respuesta
    } catch (error) {
        console.error('Error al obtener las zonas:', error);
        throw error;
    }
}

