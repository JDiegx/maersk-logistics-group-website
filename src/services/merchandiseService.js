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
