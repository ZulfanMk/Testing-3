const assert = require('assert'); // Import assert
Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('liking one restaurant', async ({ I }) => {
  // Pastikan ada restoran yang ditampilkan di halaman utama
  I.seeElement('.restaurant-item a'); // Elemen link menuju detail restoran
  const firstRestaurant = locate('.restaurant-item a').first(); // Ambil restoran pertama
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant); // Ambil judul restoran pertama
  I.click(firstRestaurant); // Klik restoran pertama

  // Masuk ke halaman detail restoran
  I.seeElement('#likeButton'); // Tombol suka
  I.click('#likeButton'); // Klik tombol suka

  // Kembali ke halaman favorit untuk memastikan restoran telah disukai
  I.amOnPage('/#/favorite'); // Navigasi ke halaman restoran favorit
  I.seeElement('.restaurant-item'); // Cek apakah elemen restoran favorit ditampilkan
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item a'); // Ambil judul restoran favorit

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
