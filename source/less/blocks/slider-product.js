const TRIGGER_OFFSET = 7; //порог срабатывания свайпа, 1/7 от ширины слайда
  let slider_List = document.querySelector(".slider-product__list"); //обертка слайдераconsole.log(slider_List);
  let slider_Products = document.querySelectorAll(".slider-product__item"); //массив со слайдами
  let touchSurface_2 = document.querySelector(".slider-product__wrapper"); //зона свайпа
  let sliderDots_2 = document.querySelectorAll(".products__dot"); //массив с пагинациями
  let sliderCount_2 = 0; //счетчик слайдов, индикатор текущего слайда
  let sliderWidth_2; //ширина видимой части слайдера, ширина одного слайда
  let startX_2; //начальная точка касания, для тачпадов
  let startY_2;
  let dragndropSlidePosition_2; //позиция ленты слайдеров после оттаскивания слайда при свайпе на произвольное расстояние в px для translateX
  let dragSlideY;
  let dragndropSlideShit_2; //величина сдвига
  let currentSlidePosition_2; // текущая позиция ленты слайдера, (величина кратна sliderCount)
  const slider_Area = 92;
  let isSkip = false;
  let startTime = 0;

  //let shift = 6;

  function showSlider_2() { //функция пересчета ширины слайдера под экран
    sliderWidth_2 = touchSurface_2.offsetWidth; //определяем ширину контейнера слайдера
    slider_List.style.width = sliderWidth_2 * slider_Products.length + "px"; //даём ширину обёртке слайдера, умноженную на кол-во слайдов
    slider_Products.forEach((item) => (item.style.width = slider_Area / 100 * sliderWidth_2 + "px")); //даём каждому слайду ширину видимой области, чтобы слайды ровно уместились в обертку
    rollSlider_2(sliderCount_2);
  }


  function rollSlider_2(index) { //ролл ленты(обёртки) слайдера в опредёлнную позицию
    slider_List.style.transform = `translateX(${-index * sliderWidth_2}px)`; //в зависимости от индикатора едем на опреденный слайд
    switchDot_2(sliderCount_2);
    currentSlidePosition_2 = sliderWidth_2 * -sliderCount_2;
    let shift = (100 - slider_Area) / 2;
    shift = shift + index * 2 * shift;
    slider_List.style.padding = `0 0 0 ${shift}%`;
  }

  function switchDot_2(index) { //переключатель пагинации
    sliderDots_2.forEach((item) => item.classList.remove("toggles__dot--current")); //убираем текущую пагинацию
    sliderDots_2[index].classList.add("toggles__dot--current"); //ебашим на нужную
  }

  const mediaQuery = window.matchMedia('(max-width: 659px)')
  if (mediaQuery.matches) {

  showSlider_2();
  window.addEventListener('resize', showSlider_2)
  window.addEventListener('load', function () {
    touchSurface_2.addEventListener("touchstart", function (e) {
      isSkip = false;
      slider_List.style.transition = "all 0s";
      let event = e.changedTouches[0];
      startY_2 = event.pageY;
      startX_2 = event.pageX;
      dragndropSlideShit_2 = 0;
      dragSlideY = 0;
    });

    touchSurface_2.addEventListener("touchmove", function (e) {
      let event = e.changedTouches[0];
      dragndropSlideShit_2 = event.pageX - startX_2;
      dragSlideY = event.pageY - startY_2;
      if (Math.abs(dragndropSlideShit_2) < Math.abs(dragSlideY)) {
        isSkip = true;
        console.log(isSkip)
        return
      } else {
        if(e.cancelable) {
          e.preventDefault();
          dragndropSlidePosition_2 = currentSlidePosition_2 + dragndropSlideShit_2;
          slider_List.style.transform = `translateX(${dragndropSlidePosition_2}px)`;
          }
        }

    });
    touchSurface_2.addEventListener("touchend", function (e) {
      let event = e.changedTouches[0];
      console.log(event)
      slider_List.style.transition = "all 0.4s";
      if (!isSkip) {
      if (dragndropSlideShit_2 < -sliderWidth_2 / TRIGGER_OFFSET && !(sliderCount_2 == slider_Products.length - 1)) {
        sliderCount_2++;
      }
      if (dragndropSlideShit_2 > sliderWidth_2 / TRIGGER_OFFSET && !(sliderCount_2 == 0)) {
        sliderCount_2--;
      }
      rollSlider_2(sliderCount_2);
    }
    });
  })
}
