/**
 * PortfolioDB - IndexedDB Utility for Resume File Storage
 * Storing larger files like PDFs directly in IndexedDB avoids
 * localStorage size limitations (5MB) and page crash issues.
 */

const DB_NAME = 'PortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'resumes';

/**
 * Initializes and returns the IndexedDB instance.
 */
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('Failed to open database: ' + event.target.error);
        };
    });
}

/**
 * Saves a resume file (PDF/Doc) as a Blob or Base64 into IndexedDB.
 * @param {Blob|File} fileBlob The resume file blob
 * @param {string} fileName Name of the file
 * @param {string} fileType MIME type of the file
 */
async function saveResume(fileBlob, fileName, fileType) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const record = {
            id: 'active_resume',
            name: fileName,
            type: fileType,
            data: fileBlob,
            uploadedAt: new Date().toISOString()
        };

        const request = store.put(record);

        request.onsuccess = () => {
            resolve(record);
        };

        request.onerror = (event) => {
            reject('Error saving resume to IndexedDB: ' + event.target.error);
        };
    });
}

/**
 * Retrieves the currently active uploaded resume from IndexedDB.
 * @returns {Promise<object|null>} The resume object or null if none exists.
 */
async function getResume() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get('active_resume');

        request.onsuccess = (event) => {
            resolve(event.target.result || null);
        };

        request.onerror = (event) => {
            reject('Error fetching resume from IndexedDB: ' + event.target.error);
        };
    });
}

/**
 * Deletes the stored resume file.
 */
async function deleteResume() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete('active_resume');

        request.onsuccess = () => {
            resolve(true);
        };

        request.onerror = (event) => {
            reject('Error deleting resume from IndexedDB: ' + event.target.error);
        };
    });
}
