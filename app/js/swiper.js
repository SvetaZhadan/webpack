import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar]);
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
var validate = require("validate.js");

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});