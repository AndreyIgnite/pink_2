let cards = document.querySelectorAll(".photo-catalog__item");
function even(id) {
  let div = id/2;
  if(div%1 == 0) {
    return true
  }
  else return false
}

function remove_panorama() {
  let id_daily
  cards.forEach((item, index) => {
    if(item.classList.contains("photo-catalog__item--daily-pan")) {
      item.classList.remove("photo-catalog__item--daily-pan")
      id_daily = index;
    }
  })
  for (let i = 0; i < cards.length; i++) {
    if(even(i)) {
      cards[i].style.margin = '0 0 20px 20px';
    }
    else if(!(even(i))) {
      cards[i].style.margin = '0 20px 20px 0';
    }
  }
}

function set_panorama(number) {
  remove_panorama();
  cards[number].classList.add("photo-catalog__item--daily-pan");
  cards[number].style.margin = '0 0 20px 0';
  for (let i = ++number; i < cards.length; i++) {
    if(even(i)) {
      cards[i].style.margin = '0 20px 20px 0';
    }
    else if(!(even(i))) {
      cards[i].style.margin = '0 0 20px 20px';
    }
  }
}