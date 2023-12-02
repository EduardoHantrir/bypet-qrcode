// Importando os componentes necessários do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDO_Yrwl99xiIh4igO-vs3Qf0Yzd2F1-ls",
    authDomain: "bypet-api.firebaseapp.com",
    projectId: "bypet-api",
    storageBucket: "bypet-api.appspot.com",
    messagingSenderId: "686837097203",
    appId: "1:686837097203:web:44c12ac560d31cd5684d86",
    measurementId: "G-LS2W4CMKE7",
};

// Inicializando o Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Obtendo uma instância do Firestore
export const db = getFirestore(app);

// Obtendo uma instância do Firebase Storage
export const storage = getStorage(app)
