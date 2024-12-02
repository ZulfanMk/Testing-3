import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

const navLinks = document.querySelector('.nav-links');
const hamburgerButton = document.querySelector('#hamburgerButton');

// Mengatur toggle untuk navigasi di perangkat mobile
hamburgerButton.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  fetchRestaurantData(); // Memuat data restoran ke halaman utama saat aplikasi di-load
});

// Mengambil data restoran dari endpoint list API
async function fetchRestaurantData() {
  try {
    // Import modul RestaurantSource dan template-creator secara dinamis
    const { default: RestaurantSource } = await import('./data/restaurant-source.js');
    const { createRestaurantItemTemplate } = await import('./views/templates/template-creator.js');

    const restaurants = await RestaurantSource.getRestaurants(); // Ambil data restoran dari API
    displayRestaurants(restaurants, createRestaurantItemTemplate); // Tampilkan restoran menggunakan template
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

// Menampilkan daftar restoran menggunakan template
function displayRestaurants(restaurants, createTemplate) {
  const restaurantListElement = document.getElementById('restaurant-list');
  restaurantListElement.innerHTML = ''; // Kosongkan daftar sebelumnya

  restaurants.forEach((restaurant) => {
    // Gunakan template untuk setiap item restoran
    const restaurantItem = document.createElement('div');
    restaurantItem.className = 'restaurant-item';
    restaurantItem.tabIndex = 0;

    restaurantItem.innerHTML = createTemplate(restaurant);
    restaurantListElement.appendChild(restaurantItem);
  });
}

// Menangani event Add to Home Screen
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event; // Simpan event untuk digunakan nanti

  const installButton = document.createElement('button');
  installButton.textContent = 'Add to Home Screen';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.right = '20px';
  installButton.style.zIndex = '1000';

  document.body.appendChild(installButton);
  installButton.addEventListener('click', () => {
    installButton.remove(); // Sembunyikan tombol setelah diklik
    deferredPrompt.prompt(); // Tampilkan prompt instalasi

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
