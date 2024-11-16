// Seleccionamos el botón de abrir, el sidebar y el botón de cierre
const menuToggle = document.querySelector('.header__menu-toggle');
const sidebar = document.querySelector('.sidebar');
const closeSideBar = document.getElementById('close-button');

// Agregamos el evento de clic para alternar la clase de mostrar el sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--active');
});

// Agregamos el evento de clic para cerrar el sidebar
closeSideBar.addEventListener('click', () => {
    sidebar.classList.remove('sidebar--active');
});
