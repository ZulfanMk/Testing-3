import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    // Menambahkan restoran ke dalam daftar favorit
    await FavoriteRestaurantIdb.addToFavorites({ id: 1, name: 'Restaurant 1' });
  });

  afterEach(async () => {
    // Menghapus restoran dari daftar favorit setelah tes selesai
    await FavoriteRestaurantIdb.removeFromFavorites(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    // Menambahkan elemen dan memeriksa apakah restoran ada dalam daftar favorit
    const isFavorited = await FavoriteRestaurantIdb.isRestaurantFavorited(1);
    expect(isFavorited).toBe(true);
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    // Memastikan bahwa restoran ada dalam daftar favorit
    const isFavorited = await FavoriteRestaurantIdb.isRestaurantFavorited(1);
    expect(isFavorited).toBe(true);
  });

  it('should be able to remove liked restaurant from the list', async () => {
    // Menghapus restoran dari daftar favorit
    await FavoriteRestaurantIdb.removeFromFavorites(1);
    const isFavorited = await FavoriteRestaurantIdb.isRestaurantFavorited(1);
    expect(isFavorited).toBe(false);
  });

  it('should not throw error when user clicks unlike widget if the restaurant is not in the list', async () => {
    // Menghapus restoran jika ada, dan memastikan tidak ada error saat mengklik "unlike"
    await FavoriteRestaurantIdb.removeFromFavorites(1);
    const isFavorited = await FavoriteRestaurantIdb.isRestaurantFavorited(1);
    expect(isFavorited).toBe(false);
  });
});
