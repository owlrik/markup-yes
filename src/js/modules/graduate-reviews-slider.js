import SwiperCore, {Pagination, Scrollbar} from "swiper/core";

const reviewsSlider = document.querySelector('.graduate-reviews-slider .swiper-container');

SwiperCore.use([Pagination, Scrollbar]);

const initSwiper = (slider) => new SwiperCore(slider, {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  }
});

const initReviewsSlider = () => {
  if (!reviewsSlider) {
    return;
  }

  initSwiper(reviewsSlider);
};

export {initReviewsSlider};
