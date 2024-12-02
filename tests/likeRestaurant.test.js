import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Menyukai Restoran', () => {
  afterEach(async () => {
    // Hapus semua restoran favorit setelah setiap pengujian
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.removeFromFavorites(restaurant.id);
    });
  });

  it('seharusnya dapat menyukai restoran yang belum disukai', async () => {
    const restaurant = { id: 1, name: 'Restoran A' };

    await FavoriteRestaurantIdb.addToFavorites(restaurant);

    const likedRestaurant = await FavoriteRestaurantIdb.isRestaurantFavorited(1);

    expect(likedRestaurant).toBeTruthy();
  });

  it('tidak menyimpan kembali restoran yang sudah disukai', async () => {
    const restaurant = { id: 1, name: 'Restoran A' };

    await FavoriteRestaurantIdb.addToFavorites(restaurant);
    await FavoriteRestaurantIdb.addToFavorites(restaurant);

    const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    expect(allRestaurants).toHaveLength(1);
  });

  it('tidak memproses penyimpanan jika data restoran tidak memiliki ID', async () => {
    const restaurantWithoutId = { name: 'Restoran Tanpa ID' };

    await FavoriteRestaurantIdb.addToFavorites(restaurantWithoutId);

    const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    expect(allRestaurants).toHaveLength(0);
  });

  it('sistem tidak gagal jika data restoran tidak memiliki ID', async () => {
    const restaurantWithoutId = { name: 'Restoran Tanpa ID' };

    await expect(
      FavoriteRestaurantIdb.addToFavorites(restaurantWithoutId),
    ).resolves.not.toThrow();
  });
});
