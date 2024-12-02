import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
<div class="restaurant-item">
    <img 
        class="restaurant-image lazyload" 
        data-src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" 
        src="images/placeholder.png" 
        alt="${restaurant.name}">
    <h3 class="restaurant-name">${restaurant.name}</h3>          
    <p class="restaurant-city">${restaurant.city}</p>
    <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
    <a href="#/detail/${restaurant.id}" class="restaurant-detail-button">View Details</a>
</div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img 
      class="restaurant__poster lazyload" 
      data-src="${CONFIG.BASE_URL}/images/medium/${restaurant.pictureId}" 
      src="images/placeholder.png" 
      alt="${restaurant.name}">
  <div class="restaurant__info">
    <h3>Information</h3>
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>City:</strong> ${restaurant.city}</p>
    <p><strong>Categories:</strong>${restaurant.categories.map((category) => category.name).join(', ')}</p>
    <p><strong>Description:</strong> ${restaurant.description}</p>
    <h4>Foods</h4>
    <ul>
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    <h4>Drinks</h4>
    <ul>
      ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
    </ul>
    <h4>Customer Reviews</h4>
    <ul>
      ${restaurant.customerReviews.map(
    (review) => `
        <li>
          <p><strong>${review.name}:</strong> ${review.review}</p>
          <p>${review.date}</p>
        </li>`
  ).join('')}
    </ul>
  </div>
`;

const createRestaurantFavoriteTemplate = (restaurant) => `
<div class="restaurant-item">
    <img 
        class="restaurant-image lazyload" 
        data-src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" 
        src="images/placeholder.png" 
        alt="${restaurant.name}">
    <h3 class="restaurant-name">${restaurant.name}</h3>          
    <p class="restaurant-city">${restaurant.city}</p>
    <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
    <a href="#/detail/${restaurant.id}" class="restaurant-detail-button">View Details</a>
</div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantFavoriteTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
