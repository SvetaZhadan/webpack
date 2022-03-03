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

$(document).ready(function () {
  $(".menuToggle").click(function () {

    $(this).toggleClass("active");
    $('.m-mobileNav').slideToggle(100, function () {
      $('.hamburger.hidden').css("display", "block");
      $('.hamburger.active').css("display", "none");
      $('.a-phoneNumber').css("display", "flex");
      $('.copyright').css("display", "block");
      if ($(this).css('display') === "none") {
        $(this).removeAttr('style');
        $('.m-col-center').css("display", "block");
        $('.hamburger.hidden').css("display", "none");
        $('.hamburger.active').css("display", "block");
        $('.a-phoneNumber').css("display", "none");
        $('.copyright').css("display", "none");
      }
    });
  });

  $(".a-closeSerchPopup").click(function () {
    $('.m-serchPopup').slideToggle(0, function () {
    });
  });
  $(".btnSearch").click(function () {
    $('.m-serchPopup').slideToggle(0, function () {
      $('.m-serchPopup').css("display", "flex");
    });
  });

  $(".btnCallBack").click(function () {
    $('.t-popup').slideToggle(150, function () {
      $('.t-popup').css("display", "flex");
      $('.m-popupBackCall').css("display", "flex");
      document.body.style.overflow = "hidden";
    });
  });
  $(".CloseCallBack").click(function () {
    $('.t-popup').slideToggle(150, function () {
      $('.t-popup').css("display", "none");
      document.body.style.overflow = "";
    });
  });
});

