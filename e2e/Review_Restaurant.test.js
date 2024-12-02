const assert = require('assert'); // Import assert
Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/'); // Mulai dari halaman utama
});

Scenario('submitting a customer review', async ({ I }) => {
  I.seeElement(".restaurant-item a"); // Pastikan ada restoran yang ditampilkan
  I.click({ xpath: "(//*[@class and contains(concat(' ', normalize-space(@class), ' '), ' restaurant-item ')]//a)[position()=1]" }); // Klik restoran pertama

  I.seeElement("#review-content"); // Pastikan form ulasan muncul
  I.fillField("#review-content", "Makanannya sangat enak!"); // Isi ulasan
  I.fillField("#review-name", "Andi"); // Isi nama
  I.click("#review-form button"); // Klik tombol kirim ulasan

  // Menunggu agar ulasan ditampilkan setelah halaman di-refresh
  I.wait(2); // Tunggu beberapa detik (sesuaikan dengan kecepatan aplikasi Anda)
  I.refreshPage(); // Refresh halaman

  // Verifikasi bahwa ulasan yang baru saja ditambahkan muncul
  I.waitForElement(".customer-reviews", 5); // Tunggu hingga elemen ulasan muncul
  I.see("Makanannya sangat enak!"); // Pastikan ulasan yang ditambahkan muncul di halaman

  // Ambil teks ulasan yang baru saja ditambahkan
  const reviewContent = await I.grabTextFrom('.customer-reviews'); // Ambil teks dari ulasan pertama yang ditampilkan
  const reviewName = "Andi"; // Nama pengirim ulasan
  const reviewText = "Makanannya sangat enak!"; // Teks ulasan

  // Verifikasi bahwa nama dan teks ulasan muncul di halaman
  assert.ok(reviewContent.includes(reviewName)); // Nama ada dalam ulasan
  assert.ok(reviewContent.includes(reviewText)); // Ulasan ada dalam teks
});
