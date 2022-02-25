import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar]);
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

$(document).ready(function() {
  $(".menuToggle").click(function() {
    $(this).toggleClass("active");
    $('.m-mobileNav').slideToggle(0,function(){
      $('.m-col-center').css("display","none");
      $('.hamburger.hidden').css("display","block")
      $('.hamburger.active').css("display","none")
      if($(this).css('display') === "none"){
        $(this).removeAttr('style');
        $('.m-col-center').css("display","block")
        $('.hamburger.hidden').css("display","none")
        $('.hamburger.active').css("display","block")
      }
    });
  });
});