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

