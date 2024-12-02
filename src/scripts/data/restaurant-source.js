const API_ENDPOINT = 'https://restaurant-api.dicoding.dev';

class RestaurantSource {
  static async getRestaurants() {
    try {
      const response = await fetch(`${API_ENDPOINT}/list`);
      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}/detail/${id}`);
      const data = await response.json();
      return data.restaurant;
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
      return null;
    }
  }
}

export default RestaurantSource;
