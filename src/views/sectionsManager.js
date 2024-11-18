document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar__item-link"); // Enlaces del menú
    const containers = document.querySelectorAll("main > div"); // Contenedores dentro de <main>

    // Función para mostrar el contenedor correspondiente
    function showContainer(containerClass) {
        // Ocultar todos los contenedores
        containers.forEach(container => container.classList.add("hidden"));

        // Mostrar el contenedor seleccionado
        const containerToShow = document.querySelector(`.${containerClass}`);
        if (containerToShow) {
            containerToShow.classList.remove("hidden");
        }
    }

    // Añadir eventos de clic a cada enlace
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            
            // Obtener el texto del enlace y convertirlo en el nombre de la clase
            const targetClass = link.textContent.trim().toLowerCase() + "-container";
            
            // Mostrar el contenedor correspondiente
            showContainer(targetClass);
        });
    });

    // Mostrar solo el contenedor inicial (Home)
    showContainer("home-container");
});