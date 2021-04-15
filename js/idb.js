// indexedDB stuff
let indexedDB;
if (self.indexedDB) {
    indexedDB = self.indexedDB;
} else {
    indexedDB = window.indexedDB;
}
let db
const request = indexedDB.open("chat", 1)

request.onupgradeneeded = (IDBVersionChangeEvent) => {
    console.log("onupgradeneeded");
    const db = request.result;
    db.createObjectStore("outbox", { autoIncrement: true });
    db.createObjectStore("inbox", { autoIncrement: true });
};


request.onerror = (error) => {
    console.error("IndexDB open error", error)
}

request.onsuccess = (result) => {
    console.log("IndexDB open success", result)
    db = request.result
    db.onerror = (error) => {
        console.error("IndexDB Database error", error.target.errorCode)
    }
}

const saveNewAnimalData = (name, message) => {
    console.log("saveNewAnimalData")
    return new Promise(((resolve, reject) => {
        const transaction = db.transaction(name, "readwrite")
        const store = transaction.objectStore(name)
        store.put(message)
        transaction.oncomplete = () => {
            console.log("Store complete")
            resolve(true)
        }
        transaction.onerror = () => {
            console.error("Store error")
            reject(false)
        }
    }))
}

const loadNewAnimalData = (name) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        const query = store.getAll()
        transaction.oncomplete = () => {
            console.log("query complete", query.result);
            resolve(query.result)
        };
        transaction.onerror = () => {
            console.error("query error");
            reject("query error")
        };
    })
}

const clearNewAnimalData = (name) => {
    return new Promise(((resolve, reject) => {
        const transaction = db.transaction(name, "readwrite")
        const store = transaction.objectStore(name)
        store.clear()
        transaction.oncomplete = () => {
            console.log("clear complete");
            resolve(true)
        };
        transaction.onerror = () => {
            console.error("clear error");
            reject("clear error")
        };
    }))
}