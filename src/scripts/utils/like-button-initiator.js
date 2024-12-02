const DB_NAME = 'restaurant-db';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

// Buka atau buat IndexedDB
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
  });
};

// Menyimpan restoran ke IndexedDB
export const saveRestaurantToFavorites = async (restaurant) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(restaurant);

  transaction.oncomplete = () => {
    console.log('Restaurant added to favorites');
  };

  transaction.onerror = () => {
    console.error('Failed to add restaurant to favorites');
  };
};

// Menghapus restoran dari IndexedDB
export const removeRestaurantFromFavorites = async (restaurantId) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(restaurantId);

  transaction.oncomplete = () => {
    console.log('Restaurant removed from favorites');
  };

  transaction.onerror = () => {
    console.error('Failed to remove restaurant from favorites');
  };
};

// Mengambil daftar restoran favorit dari IndexedDB
export const getFavoriteRestaurants = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const allRestaurants = await store.getAll();

  return allRestaurants;
};
