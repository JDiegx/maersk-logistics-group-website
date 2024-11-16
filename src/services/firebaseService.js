import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCo2e9VbS3DuUhGHUIR0AEIUEfGFlSSRIE",
    authDomain: "logistic-app-s2-2024.firebaseapp.com",
    projectId: "logistic-app-s2-2024",
    storageBucket: "logistic-app-s2-2024.appspot.com",
    messagingSenderId: "347730031440",
    appId: "1:347730031440:web:xxxxxxxxxxxxxxxx" 
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Servicio de autenticación
const firebaseService = {
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user; 
        } catch (error) {
            throw error; 
        }
    }
};

export default firebaseService;
