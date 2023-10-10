const menu = document.querySelector(".routes-menu");
const menuBtn = document.querySelector(".header__logo__menubar");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("header__menu--active");
});
