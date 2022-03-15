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

$(function ($) {
  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    var div = $('.m-popupBackCall');
    if (
      !div.is(e.target) && // если клик был не по нашему блоку
      div.has(e.target).length === 0
    ) {
      $('.t-popup').removeClass('--blackout');
      $('.m-popupBackCall').removeClass('--open');
      $('.t-popup').hide(1000);
      document.body.style.overflow = '';
    }
  });
});

$('.btnCallBack').click(function () {
  $('.t-popup').css('display', 'block');
  setTimeout(function () {
    $('.t-popup').addClass('--blackout');
    $('.m-popupBackCall').addClass('--open');
  }, 20);
  document.body.style.overflow = 'hidden';
});

$('.CloseCallBack').click(function () {
  $('.t-popup').removeClass('--blackout');
  $('.m-popupBackCall').removeClass('--open');
  setTimeout(function () {
    $('.t-popup').css('display', 'none');
  }, 1000);
  document.body.style.overflow = '';
});

$(document).ready(function () {
  $('.menuToggle').click(function () {
    $(this).toggleClass('active');
    $('.m-mobileNav').slideToggle(0, function () {
      $('.hamburger.hidden').css('display', 'block');
      $('.hamburger.active').css('display', 'none');
      $('.a-phoneNumber').css('display', 'flex');
      $('.copyright').css('display', 'block');
      if ($(this).css('display') === 'none') {
        $(this).removeAttr('style');
        $('.m-col-center').css('display', 'block');
        $('.hamburger.hidden').css('display', 'none');
        $('.hamburger.active').css('display', 'block');
        $('.a-phoneNumber').css('display', 'none');
        $('.copyright').css('display', 'none');
      }
    });
  });

  $('.a-closeSerchPopup').click(function () {
    $('.m-searchPopup').slideToggle(0, function () {
      $('.t-searchPopup').css('display', 'none');
    });
  });

  $('.btnSearch').click(function () {
    $('.m-searchPopup').slideToggle(0, function () {
      $('.m-searchPopup').css('display', 'flex');
      $('.t-searchPopup').css('display', 'block');
    });
  });
});

var phoneMask = IMask(document.getElementById('phone-mask'), {
  mask: '+{7}(000)000-00-00',
});
require(["validate.js"], function(validate) {
var constraints = {
  
  phone: {
    presence: true,
    format: {
      pattern: /^(\+){7}((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/,
      message: function(value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^%{num} is not a valid phone number", {
          num: value
        });
      }
    }
  }

};

$('.PhoneNumber').change(function () {
    console.log("this is",  validate({phone: document.getElementById('phone-mask').value}, constraints));
});
});

require(["validate.js"], function(validate1) {
  var constraints = {
    
    name: {
      presence: true,
      format: {
        pattern: /^[а-яА-ЯёЁa-zA-Z]+ [а-яА-ЯёЁa-zA-Z]+ ?[а-яА-ЯёЁa-zA-Z]+$/,
        message: function(value1, attribute, validatorOptions, attributes, globalOptions) {
          value1=$('#name');
          return validate.format("^%{name} is not a valid name", { 
            name: value1
          });
        }
      },
    },
  };
  
  $('.Name').change(function () {
      let username=document.getElementById('name').value;
      console.log("this is name",  validate1({name: username}, constraints));
  });
  });

  if(document.getElementById('name').value==""){
    $('#name').css({outline:green})
  }
