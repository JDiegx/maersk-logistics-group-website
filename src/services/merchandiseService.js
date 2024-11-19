// service.js
export async function submitMerchandise(payload) {
    try {
        const response = await fetch('http://localhost:8080/logisticAPP/v1/merchandises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Enviar el objeto JSON como body
        });

        if (!response.ok) {
            throw new Error('Failed to submit the form');
        }

        const result = await response.json();
        return { success: true, data: result }; // Devolver el resultado exitoso
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message }; // Devolver el resultado de error
    }
}

export async function getMerchandise() {
    const apiUrl = 'https://example.com/api/merchandise'; // Reemplaza con la URL real de tu API

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const merchandise = await response.json();
        return merchandise; // Se espera que este sea un array con la lista de mercancías
    } catch (error) {
        console.error("Error al obtener mercancías:", error);
        throw error; // Relanza el error para manejarlo donde se llame esta función
    }
}
