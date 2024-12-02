import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <h2 class="content-heading">Restaurant List</h2>
      <div id="restaurant-list" class="restaurant-list"></div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await RestaurantSource.getRestaurants();
      const restaurantListContainer = document.querySelector('#restaurant-list');

      restaurantListContainer.innerHTML = restaurants
        .map((restaurant) => createRestaurantItemTemplate(restaurant))
        .join('');
    } catch (error) {
      console.error(error);
      const restaurantListContainer = document.querySelector('#restaurant-list');
      restaurantListContainer.innerHTML = '<p>Gagal memuat data restoran. Silakan coba lagi nanti.</p>';
    }
  },
};

export default Home;
