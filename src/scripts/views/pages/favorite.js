import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantFavoriteTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div id="mainContent" tabindex="0">
      <div class="favorite">
        <h2 class="content-heading">Favorite Restaurants</h2>
        <div id="favorite-restaurants" class="favorite-restaurants"></div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#favorite-restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = `
        <div class="restaurant-item__not__found">You have no favorite restaurants yet!</div>
      `;
      return;
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantFavoriteTemplate(restaurant);
    });
  },
};

export default Favorite;
