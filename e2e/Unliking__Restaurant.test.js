const assert = require('assert'); // Import assert

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/'); // Pastikan kita berada di halaman utama
});

Scenario('unliking a restaurant', async ({ I }) => {
  // Pastikan ada restoran yang ditampilkan di halaman utama
  I.seeElement('.restaurant-item a'); // Elemen link menuju detail restoran
  const firstRestaurant = locate('.restaurant-item a').first(); // Ambil restoran pertama
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant); // Ambil judul restoran pertama
  I.click(firstRestaurant); // Klik restoran pertama

  // Masuk ke halaman detail restoran
  I.seeElement('#likeButton'); // Tombol suka
  I.click('#likeButton'); // Klik tombol suka untuk menyukai restoran

  // Kembali ke halaman favorit untuk memastikan restoran telah disukai
  I.amOnPage('/#/favorite'); // Navigasi ke halaman restoran favorit
  I.seeElement('.restaurant-item'); // Cek apakah elemen restoran favorit ditampilkan
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item a'); // Ambil judul restoran favorit

  // Bandingkan judul restoran untuk memastikan restoran yang disukai sesuai
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Masuk ke halaman detail restoran favorit
  I.click('.restaurant-item a'); // Klik restoran favorit pertama
  I.seeElement('#likeButton'); // Pastikan tombol suka muncul
  I.click('#likeButton'); // Klik tombol suka untuk membatalkan suka

  // Pastikan restoran dihapus dari halaman favorit
  I.amOnPage('/#/favorite'); // Navigasi ulang ke halaman favorit
  I.dontSeeElement('.restaurant-item'); // Restoran tidak lagi ada di daftar favorit
});
