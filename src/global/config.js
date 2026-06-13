import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadAndConvertFile(file) {
    if (!file) return null;

    try {
        // Separar extensi\u00f3n antes de sanitizar para conservarla legible en el bucket
        const lastDot = file.name.lastIndexOf(".");
        const rawName = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
        const rawExt = lastDot > 0 ? file.name.slice(lastDot + 1) : "";
        const sanitize = (str) => str.replace(/[^\w\s]/gi, "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
        const baseName = sanitize(rawName) || "archivo";
        const ext = sanitize(rawExt);
        const fileName = ext ? `${baseName}.${ext}` : baseName;
        // Identificador \u00fanico para evitar colisiones de nombre que sobrescriben archivos en Storage
        const uniqueId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const storageRef = ref(storage, `solicitudes/${uniqueId}_${fileName}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file: ", error);
        return null;
    }
}

