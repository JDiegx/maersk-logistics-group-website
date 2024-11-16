import firebaseService from '../services/firebaseService.js';

document.querySelector('#manage-zones-login').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const errorMessage = document.querySelector('#error-message');

    try {
        const user = await firebaseService.login(email, password);
        errorMessage.style.display = "none";

        emailInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error('Login error:', error.message);
        errorMessage.textContent = 'Invalid credentials. Please try again.';
        errorMessage.style.display = "block";

        emailInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
    }
});
