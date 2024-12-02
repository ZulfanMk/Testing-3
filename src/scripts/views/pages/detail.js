import RestaurantSource from '../../data/restaurant-source.js';
import {
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../templates/template-creator.js';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import ReviewInitiator from '../../utils/review-initiator.js';

const Detail = {
  async render() {
    return `
    <div id="mainContent" tabindex="0">
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="customer-reviews" class="customer-reviews"></div>
      <div id="review-form-container" class="review-form-container">
        <h3>Add Your Review</h3>
        <form id="review-form">
          <input type="text" id="review-name" placeholder="Your Name" required />
          <textarea id="review-content" placeholder="Your Review" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    
      <div id="likeButtonContainer"></div>
    </div>
    `;
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/')[2];

    try {
      const restaurant = await RestaurantSource.detailRestaurant(id);
      const restaurantDetailContainer = document.querySelector('#restaurant-detail');
      const likeButtonContainer = document.querySelector('#likeButtonContainer');

      // Menggunakan template untuk menampilkan detail restoran
      restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      // Fungsi untuk memperbarui tampilan tombol dan event listener
      const renderLikeButton = async () => {
        const isFavorited = await FavoriteRestaurantIdb.isRestaurantFavorited(restaurant.id);
        likeButtonContainer.innerHTML = isFavorited ? createLikedButtonTemplate() : createLikeButtonTemplate();

        // Event listener untuk tombol like/unlike
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
          if (isFavorited) {
            await FavoriteRestaurantIdb.removeFromFavorites(restaurant.id);
          } else {
            await FavoriteRestaurantIdb.addToFavorites(restaurant);
          }
          // Render ulang tombol setelah status diperbarui
          await renderLikeButton();
        });
      };

      // Render tombol favorit pertama kali
      await renderLikeButton();

      // Inisialisasi ulasan menggunakan ReviewInitiator
      ReviewInitiator.init({
        formContainer: document.querySelector('#review-form-container'),
        reviewsContainer: document.querySelector('#customer-reviews'),
        restaurant,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default Detail;
