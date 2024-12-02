import CONFIG from '../globals/config';

const ReviewInitiator = {
  init({ formContainer, reviewsContainer, restaurant }) {
    this._formContainer = formContainer;
    this._reviewsContainer = reviewsContainer;
    this._restaurant = restaurant;

    this._renderReviews();
    this._addFormSubmitListener();
  },

  _renderReviews() {
    this._reviewsContainer.innerHTML = `
      <h3>Customer Reviews</h3>
      <ul>
        ${this._restaurant.customerReviews
    .map(
      (review, index) => `
          <li data-index="${index}">
            <p><strong>${review.name}</strong> (${review.date}):</p>
            <p>${review.review}</p>
          </li>
        `
    )
    .join('')}
      </ul>
    `;
  },

  _addFormSubmitListener() {
    const reviewForm = this._formContainer.querySelector('form');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = this._formContainer.querySelector('#review-name').value.trim();
      const content = this._formContainer.querySelector('#review-content').value.trim();

      if (name && content) {
        const newReview = {
          id: this._restaurant.id,
          name,
          review: content,
        };

        try {
          // Kirim POST request ke server
          const response = await fetch(`${CONFIG.BASE_URL}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          });

          const responseData = await response.json();

          if (response.ok) {
            // Perbarui data customer reviews
            this._restaurant.customerReviews = responseData.customerReviews;

            // Render ulang ulasan
            this._renderReviews();

            // Kosongkan form
            reviewForm.reset();

            alert('Review berhasil ditambahkan!');
          } else {
            throw new Error(responseData.message || 'Gagal menambah review.');
          }
        } catch (error) {
          console.error(error);
          alert('Terjadi kesalahan saat mengirim review. Coba lagi nanti.');
        }
      } else {
        alert('Mohon isi nama dan ulasan sebelum submit.');
      }
    });
  },
};

export default ReviewInitiator;
