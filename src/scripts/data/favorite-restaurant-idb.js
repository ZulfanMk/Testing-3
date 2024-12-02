import { openDB } from 'idb';

const DB_NAME = 'restoranku';
const DB_VERSION = 1;
const STORE_NAME = 'restaurants';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    store.createIndex('name', 'name');
  },
});

class FavoriteRestaurantIdb {
  static async addToFavorites(restaurant) {
    if (!restaurant.id) {
      console.error('Restaurant must have an id to be added to favorites.');
      return;
    }

    try {
      const db = await dbPromise;
      await db.put(STORE_NAME, restaurant);
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  }

  static async removeFromFavorites(id) {
    try {
      const db = await dbPromise;
      await db.delete(STORE_NAME, id);
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  }

  static async isRestaurantFavorited(id) {
    try {
      const db = await dbPromise;
      const restaurant = await db.get(STORE_NAME, id);
      return !!restaurant;
    } catch (error) {
      console.error('Failed to check if restaurant is favorited:', error);
      return false;
    }
  }


  static async getAllRestaurants() {
    try {
      const db = await dbPromise;
      return await db.getAll(STORE_NAME);
    } catch (error) {
      console.error('Failed to get all favorite restaurants:', error);
      return [];
    }
  }
}

export default FavoriteRestaurantIdb;
