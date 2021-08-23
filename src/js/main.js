import {headerScroll} from './modules/header';
import {initModals} from "./modules/init-modals";
import {initReviewsSlider} from "./modules/graduate-reviews-slider";

window.addEventListener('load', () => {
  headerScroll();
  initModals();
  initReviewsSlider();
});
