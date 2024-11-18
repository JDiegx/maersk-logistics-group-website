export async function createZone(zoneData) {
    try {
        const response = await fetch("http://localhost:8080/logisticAPP/v1/winery_zones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(zoneData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || response.statusText);
        }

        return response; // Devuelve la respuesta para que podamos manejarla en la vista
    } catch (error) {
        console.error("Error creating zone:", error);
        throw error;
    }
}


export async function getZones() {
    try {
        const response = await fetch("http://localhost:8080/logisticAPP/v1/winery_zones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching zones:", error);
        throw error; // Lanzamos el error para manejarlo en la capa de vista
    }
}
