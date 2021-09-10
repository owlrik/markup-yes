import {headerScroll} from './modules/header';
import {initModals} from './modules/init-modals';
import {initReviewsSlider} from './modules/graduate-reviews-slider';
import {initPhoneMask} from './modules/init-phone-mask';
import {initForm} from './modules/form';

window.addEventListener('load', () => {
  headerScroll();
  initModals();
  initReviewsSlider();
  initPhoneMask();
  initForm();
});
