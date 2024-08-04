const mediaQueryLoop = window.matchMedia('(max-width: 1079px)')
console.log(mediaQueryLoop.matches)
let loop = true;
if (mediaQueryLoop.matches) {
  loop = false;
}
console.log('повтор = ' + loop )
new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: loop,
});