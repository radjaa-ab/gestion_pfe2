// src/utils/api.ts
import axios from 'axios';

// Création de l'instance Axios avec la configuration de base
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    withCredentials: true,
});

// Intercepteur de requêtes pour inclure les tokens CSRF et Bearer
api.interceptors.request.use(async (config) => {
    try {
        // Vérification et récupération du token CSRF si absent
        if (!document.cookie.includes('XSRF-TOKEN')) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        }

        // Ajout du token CSRF dans les headers
        const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
        if (token) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        }

        // Ajout du token d'authentification (Bearer)
        const authToken = localStorage.getItem('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    } catch (error) {
        console.error('Erreur CSRF:', error);
        throw error; // Relance l'erreur pour gestion ultérieure
    }
});

// Intercepteur de réponses pour la gestion des erreurs
api.interceptors.response.use(
    (response) => response, // Retourne directement la réponse en cas de succès
    (error) => {
        if (error.response) {
            console.error('Erreur réponse:', error.response.data);
        } else if (error.request) {
            console.error('Erreur requête:', error.request);
        } else {
            console.error('Erreur générale:', error.message);
        }
        return Promise.reject(error);
    }
);

// Fonctions d'authentification et d'administration

/**
 * Connexion d'un utilisateur
 * @param email - Adresse email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 */
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        console.log('Réponse connexion:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur connexion:', error);
        throw error;
    }
};

/**
 * Déconnexion d'un utilisateur
 */
export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Erreur déconnexion:', error);
    }
};

/**
 * Enregistrement d'un nouvel utilisateur
 * @param userData - Données de l'utilisateur (nom, email, mot de passe, rôle)
 */
export const register = async (userData: { name: string; email: string; password: string; role: string }) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Erreur enregistrement:', error);
        throw error;
    }
};

/**
 * Importation de plusieurs utilisateurs via un fichier CSV
 * @param file - Fichier à importer
 */
export const importUsers = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/import-users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur importation utilisateurs:', error);
        throw error;
    }
};

export default api;
