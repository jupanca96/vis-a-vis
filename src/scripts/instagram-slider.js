import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

new Swiper('.instagram-slider', {
  modules: [Autoplay],

  loop: true,

  speed: 800,

  spaceBetween: 16,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 3,
    },
  },
});