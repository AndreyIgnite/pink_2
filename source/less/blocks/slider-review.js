
let sliderList = document.querySelector(".slider-review__list"), //обертка слайдера
sliderReviews = document.querySelectorAll(".slider-review__item"), //массив со слайдами
sliderDots = document.querySelectorAll(".reviews__dot"), //массив с пагинациями
sliderBtnNext = document.querySelector(".reviews__button--next"), //вперед, только для десктопа
sliderBtnPrev = document.querySelector(".reviews__button--prev"), //назад
touchSurface = document.querySelector(".slider-review"), //зона свайпа
sliderCount = 0, //счетчик слайдов, индикатор текущего слайда
sliderWidth, //ширина видимой части слайдера, ширина одного слайда
startX, //начальная точка касания, для тачпадов
dragndropSlidePosition, //позиция ленты слайдеров после оттаскивания слайда при свайпе на произвольное расстояние в px для translateX
dragndropSlideShit, //величина сдвига
currentSlidePosition; // текущая позиция ленты слайдера, (величина кратна sliderCount)

showSlider(sliderCount); //пересчет ширины слайда при загрузке страницы

function showSlider(index) { //функция пересчета ширины слайдера под экран
  sliderWidth = document.querySelector(".slider-review").offsetWidth; //определяем ширину контейнера слайдера
  sliderList.style.width = sliderWidth * sliderReviews.length + "px"; //даём ширину обёртке слайдера, умноженную на кол-во слайдов
  sliderReviews.forEach((item) => (item.style.width = sliderWidth + "px")); //даём каждому слайду ширину видимой области, чтобы слайды ровно уместились в обертку
  rollSlider(index); //двигаем ленту чтобы слайд с номеров index оказался напротив ровно видимой области
}
function nextSlide(index) {

}
function prevSlide(index) {

}
function rollSlider(index) { //ролл ленты(обёртки) слайдера в опредёлнную позицию
  sliderList.style.transform = `translateX(${-index * sliderWidth}px)`; //в зависимости от индикатора едем на опреденный слайд
  switchDot(index); //переключаем пагинацию
  currentSlidePosition = sliderWidth * -sliderCount; //
}
function switchDot(index) { //переключатель пагинации
  sliderDots.forEach((item) => item.classList.remove("toggles__dot--current")); //убираем текущую пагинацию
  sliderDots[index].classList.add("toggles__dot--current"); //ебашим на нужную
}
window.addEventListener('load', function () {
  window.addEventListener("resize", function () { //пересчитываем ширину для меняется ширина экрана
    showSlider(sliderCount);
  });
  sliderBtnNext.addEventListener("click", function () {
    sliderCount++;
    if (sliderCount >= sliderReviews.length) {
      sliderCount = 0;
    }
    rollSlider(sliderCount);
  });
  sliderBtnPrev.addEventListener("click", function () {
    sliderCount--;
    if (sliderCount < 0) {
    sliderCount = sliderReviews.length - 1;
    }
    rollSlider(sliderCount);
  });
  sliderDots.forEach((item, index) => {
    item.addEventListener("click", () => {
      sliderCount = index;
      rollSlider(sliderCount);
    });
  });
  touchSurface.addEventListener("touchstart", function (e) {
      sliderList.style.transition = "all 0s";
      let event = e.changedTouches[0];
      startX = event.pageX;
      dragndropSlideShit = 0;
      //e.preventDefault();
      e.stopPropagation();
    }, false);
  touchSurface.addEventListener("touchmove", function (e) {
      let event = e.changedTouches[0];
      dragndropSlideShit = event.pageX - startX;
      dragndropSlidePosition = currentSlidePosition + dragndropSlideShit;
      sliderList.style.transform = `translateX(${dragndropSlidePosition}px)`;
      //e.preventDefault();
      e.stopPropagation();
    }, false);
  touchSurface.addEventListener("touchend", function (e) {
      sliderList.style.transition = "all 0.4s";
      if (dragndropSlideShit < -sliderWidth / TRIGGER_OFFSET && !(sliderCount == sliderReviews.length - 1)) {
        sliderCount++;
      }
      if (dragndropSlideShit > sliderWidth / TRIGGER_OFFSET && !(sliderCount == 0)) {
        sliderCount--;
      }
      rollSlider(sliderCount);
      e.stopPropagation();
      //e.preventDefault();
    }, false);
})