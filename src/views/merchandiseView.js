// Este código se ejecutará cuando el formulario se envíe
document.getElementById('merchandiseForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Capturar los valores de los inputs
    const names = document.getElementById('names').value;
    const description = document.getElementById('description').value;
    const zones = Array.from(document.getElementById('zones').selectedOptions).map(option => option.value);
    const occupiedVolume = parseFloat(document.getElementById('occupiedVolume').value);
    const occupiedWeight = parseFloat(document.getElementById('occupiedWeight').value);
    const entryDate = document.getElementById('entryDate').value;
    const departureDate = document.getElementById('departureDate').value;

    // Crear el objeto con los datos a enviar
    const merchandiseData = {
        names: names,
        description: description,
        zones: zones, // Aquí asumimos que las zonas se pasan como un arreglo
        occupiedVolume: occupiedVolume,
        occupiedWeight: occupiedWeight,
        entryDate: entryDate,
        departureDate: departureDate
    };

    // Enviar los datos usando fetch
    try {
        const response = await fetch('http://localhost:8080/logisticAPP/v1/merchandises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
            },
            body: JSON.stringify(merchandiseData) // Convertimos el objeto a JSON
        });

        if (response.ok) {
            alert('Mercancía creada con éxito');
            // Limpiar el formulario después de que se envíe correctamente
            document.getElementById('merchandiseForm').reset();

            // Si las zonas se llenan dinámicamente, se debe restablecer su valor también
            document.getElementById('zones').selectedIndex = -1; // Deselecciona todas las opciones
        } else {
            alert('Hubo un error al crear la mercancía');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al intentar enviar los datos');
    }
});
