// var validate = require('validate.js');
let phoneMask = IMask(document.getElementById('phone-mask'), {
  mask: '+{7}(000)000-00-00',
});

// require(['validate.js'], function (validate) {
//   let constraints = {
//     phone: {
//       presence: true,
//       format: {
//         pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
//         message: function (value, attribute, validatorOptions, attributes, globalOptions) {
//           return validate.format('^%{num} is not a valid phone number', {
//             num: value,
//           });
//         },
//       },
//     },
//   };
//   $('.PhoneNumber').change(function () {
//     console.log('phone', validate({ phone: document.getElementById('phone-mask').value }, constraints));
//   });
// });

// require(['validate.js'], function (validate) {
//   let constraints = {
//     name: {
//       presence: true,
//       format: {
//         pattern: /^[a-zа-яё\s]+$/iu,
//         message: function (value, attribute, validatorOptions, attributes, globalOptions) {
//           return validate.format('^%{name} is not a valid name', {
//             name: value,
//           });
//         },
//       },
//     },
//   };
//   $('.Name').change(function () {
//     console.log('name', validate({ name: document.getElementById('name').value }, constraints));
//   });
// });

function ValidForm(name, phone, btn) {
  let check = name.val().length > 2 && phone.val().length == 16;
    btn.disabled = !check;
}

$('.Name').on('keypress', function noDigits(event) {
  if ('1234567890'.indexOf(event.key) != -1) event.preventDefault();
});

$('.Name').on('change keyup blur', function () {
  if ($(this).val().length < 2 && $(this).val().length != 0) {
    $(this).attr('style', 'border: 1px solid red;');
    $('.messageError.--name').css('display', 'block');
  } else {
    $(this).attr('style', 'border: 1px solid #1f1f1f99;');
    $('.messageError.--name').css('display', 'none');
  }
  ValidForm($('.Name'), $('.PhoneNumber'), document.querySelector('.CallBack'));
});

$('.PhoneNumber').on('change keyup blur', function () {
  if ($(this).val().length < 16 && $(this).val().length != 0) {
    $(this).attr('style', 'border: 1px solid red;');
    $('.messageError.--phone').css('display', 'block');
  } else {
    $(this).attr('style', 'border: 1px solid #1f1f1f99;');
    $('.messageError.--phone').css('display', 'none');
  }
  ValidForm($('.Name'), $('.PhoneNumber'), document.querySelector('.CallBack'));
});
