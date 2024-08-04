let toggler = document.querySelector(".main-nav__toggler");
let navigation = document.querySelector(".main-nav");
let no_js_body = document.querySelector(".page-body--no-js");
let no_js_navigation = document.querySelector(".main-nav--no-js");
no_js_body.classList.remove("page-body--no-js");
no_js_navigation.classList.remove("main-nav--no-js");
toggler.addEventListener("click", function () {
  navigation.classList.toggle("main-nav--opened");
  navigation.classList.toggle("main-nav--closed");
});
